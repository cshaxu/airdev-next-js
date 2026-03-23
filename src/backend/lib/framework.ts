import { databaseAdapter } from '@airdev/next/adapter/backend/data';
import { frameworkAdapter } from '@airdev/next/adapter/backend/framework';
import { privateConfig } from '@airdev/next/backend/config';
import { HEADER_CURRENT_USER_ID_KEY, publicConfig } from '@airdev/next/common/config';
import {
  DispatcherOptions,
  commonDispatcherConfig,
  commonHandlerConfig,
} from '@airdev/next/framework/callbacks';
import { Context, ContextUser, mockContext } from '@airdev/next/framework/context';
import { DispatcherConfig, Executor, wait } from '@airent/api';
import { HandlerConfig } from '@airent/api-next';
import createHttpError from 'http-errors';
import { pick } from 'lodash-es';
import { getServerSession } from 'next-auth';
import { authOptions } from './nextauth';

export { mockContext } from '@airdev/next/framework/context';

export const dispatcherConfig: Pick<
  DispatcherConfig<DispatcherOptions, Context, any, any, any, any>,
  'authorizer' | 'parserWrapper' | 'executorWrapper' | 'errorHandler'
> = { ...commonDispatcherConfig, executorWrapper };

export const handlerConfig: HandlerConfig<Context, any, any, any, any> = {
  ...commonHandlerConfig,
  authenticator,
};

async function authenticator(request: Request): Promise<Context> {
  const time = new Date();
  const { method, url, headers } = request;
  const currentUser = await getCurrentUser(headers);
  return { time, method, url, headers, currentUser };
}

async function getCurrentUser(headers: Headers): Promise<ContextUser | null> {
  // load actual current user
  const realCurrentUserPromise = getRealCurrentUser();
  // load became user
  const becameUserPromise = getBecameUser(headers);
  const [realCurrentUser, becameUser] = await Promise.all([
    realCurrentUserPromise,
    becameUserPromise,
  ]);

  if (
    publicConfig.service.environment === 'local' ||
    realCurrentUser?.isAdmin
  ) {
    return becameUser ?? realCurrentUser;
  }
  return realCurrentUser;
}

export async function getRealCurrentUser(): Promise<ContextUser | null> {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email ?? null;
  // load actual current user
  return email ? await getNullableUserSafe(email) : null;
}

async function getBecameUser(headers: Headers): Promise<ContextUser | null> {
  const userId = getCookieHeaderKey(headers, HEADER_CURRENT_USER_ID_KEY);
  return userId === null ? null : await getNullableUserSafe(userId);
}

async function getNullableUserSafe(id: string): Promise<ContextUser | null> {
  try {
    const context = await mockContext();
    const user = await databaseAdapter.getOneUserSafe({ id }, context);
    if (user === null) {
      return null;
    }
    return pick(user, [
      'id',
      'email',
      'name',
      'imageUrl',
      'isAdmin',
      'createdAt',
    ]);
  } catch (error) {
    frameworkAdapter.logError(error, { id });
    return null;
  }
}

function getCookieHeaderKey(headers: Headers, key: string): string | null {
  const cookieUserId =
    (headers.get('cookie') ?? '')
      .split(';')
      .map((s) => s.trim().split('='))
      .filter(([k, _v]) => k === key)
      .map(([_k, v]) => v)
      .at(0) ?? null;
  const headerUserId = headers.get(key);
  return cookieUserId ?? headerUserId;
}

function executorWrapper<PARSED, RESULT>(
  executor: Executor<PARSED, Context, RESULT>,
  options?: DispatcherOptions
): Executor<PARSED, Context, RESULT> {
  return async (parsed: PARSED, context: Context) => {
    const { url } = context;
    const requireRequestCache =
      options?.cacheRequest !== undefined
        ? options.cacheRequest
        : privateConfig.cacheRequestPathPrefixes.some((path) =>
            url.includes(path)
          );

    if (requireRequestCache) {
      const requestCache = await databaseAdapter.createOneRequestCacheSafe(
        parsed,
        context
      );
      if (requestCache === null) {
        // key conflict
        let delay = 1000;
        const maxDelay = 5 * 1000;
        do {
          const { completedAt, response } =
            await databaseAdapter.getOneRequestCache(parsed, context);
          if (completedAt === null) {
            // exponential backoff
            await wait(delay);
            delay *= 2;
          } else {
            return response as RESULT;
          }
        } while (delay < maxDelay);
        throw createHttpError.RequestTimeout();
      } else {
        // key acquired
        const result = await executor(parsed, context);
        await databaseAdapter.updateOneRequestCacheSafe(
          requestCache,
          result,
          context
        );
        return result;
      }
    }

    return await executor(parsed, context);
  };
}
