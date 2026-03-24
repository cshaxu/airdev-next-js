import { backendFunctionConfig } from '@/config/function/backend';
import { commonFunctionConfig } from '@/config/function/common';
import { privateConfig } from '@/config/private';
import { HEADER_CURRENT_USER_ID_KEY, publicConfig } from '@/config/public';
import { buildContextUserFromPackageUser } from '@/package/backend/utils/user';
import {
  DispatcherOptions,
  commonDispatcherConfig,
  commonHandlerConfig,
} from '@/package/framework/callbacks';
import { Context, ContextUser } from '@/package/framework/context';
import { DispatcherConfig, Executor, wait } from '@airent/api';
import { HandlerConfig } from '@airent/api-next';
import createHttpError from 'http-errors';
import { getServerSession } from 'next-auth';
import { headers as getHeaders } from 'next/headers';
import { authOptions } from './nextauth';

export async function mockContext(
  context?: Partial<Context>
): Promise<Context> {
  const headers = context?.headers ?? (await getHeaders());
  return {
    time: context?.time ?? new Date(),
    method: context?.method ?? '',
    url: context?.url ?? '',
    headers,
    currentUser: context?.currentUser ?? null,
  };
}

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
    publicConfig.service.serviceEnvironment === 'local' ||
    realCurrentUser?.isAdmin
  ) {
    return becameUser ?? realCurrentUser;
  }
  return realCurrentUser;
}

export async function getRealCurrentUser(): Promise<ContextUser | null> {
  const session = await getServerSession(authOptions);
  const { email } = session?.user ?? {};
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
    const user = await backendFunctionConfig.user.getOneSafe(id, context);
    if (user === null) {
      return null;
    }
    return buildContextUserFromPackageUser(user);
  } catch (error) {
    commonFunctionConfig.logError(error, { id });
    return null;
  }
}

function getCookieHeaderKey(headers: Headers, key: string): string | null {
  const cookierUserId =
    (headers.get('cookie') ?? '')
      .split(';')
      .map((s) => s.trim().split('='))
      .filter(([k, _v]) => k === key)
      .map(([_k, v]) => v)
      .at(0) ?? null;
  const headerUserId = headers.get(key);
  return cookierUserId ?? headerUserId;
}

const CACHED_REQUEST_PATHS = [
  '/data/create-one-',
  '/data/update-one-',
  '/data/delete-one-',
];

function executorWrapper<PARSED, RESULT>(
  executor: Executor<PARSED, Context, RESULT>,
  options?: DispatcherOptions
): Executor<PARSED, Context, RESULT> {
  return async (parsed: PARSED, context: Context) => {
    const { url } = context;
    const requireRequestCache =
      options?.cacheRequest !== undefined
        ? options.cacheRequest
        : CACHED_REQUEST_PATHS.some((path) => url.includes(path));
    if (requireRequestCache) {
      const requestCache =
        await backendFunctionConfig.systemRequestCache.createOneSafe(
          parsed,
          context
        );
      if (requestCache === null) {
        // key conflict
        let delay = 1000;
        do {
          const { completedAt, response } =
            await backendFunctionConfig.systemRequestCache.getOne(
              parsed,
              context
            );
          if (completedAt === null) {
            // exponential backoff
            await wait(delay);
            delay *= 2;
          } else {
            return response as RESULT;
          }
        } while (delay < privateConfig.database.dbDelaySeconds * 1000);
        throw createHttpError.RequestTimeout();
      } else {
        // key acquired
        const result = await executor(parsed, context);
        await backendFunctionConfig.systemRequestCache.updateOneSafe(
          requestCache.id,
          result,
          context
        );
        return result;
      }
    } else {
      return await executor(parsed, context);
    }
  };
}
