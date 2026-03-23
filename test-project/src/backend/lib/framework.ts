import { DB_DELAY_SECONDS } from '@/backend/config';
import { authOptions } from '@/backend/lib/nextauth';
import SystemRequestCacheService from '@/backend/services/data/system-request-cache';
import UserService from '@/backend/services/data/user';
import { HEADER_CURRENT_USER_ID_KEY, IS_SERVICE_LOCAL } from '@/common/config';
import {
  DispatcherOptions,
  commonDispatcherConfig,
  commonHandlerConfig,
} from '@/framework/callbacks';
import { Context, ContextUser } from '@/framework/context';
import { logError } from '@/framework/logging';
import { DispatcherConfig, Executor, wait } from '@airent/api';
import { HandlerConfig } from '@airent/api-next';
import createHttpError from 'http-errors';
import { pick } from 'lodash-es';
import { getServerSession } from 'next-auth';
import { headers as getHeaders } from 'next/headers';

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
  if (IS_SERVICE_LOCAL || realCurrentUser?.isAdmin) {
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
    const entity = await UserService.getOneSafe({ id }, context);
    if (entity === null) {
      return null;
    }
    const isAdmin = entity.getIsAdmin();
    return {
      ...pick(entity, ['id', 'email', 'name', 'imageUrl', 'createdAt']),
      isAdmin,
    };
  } catch (error) {
    logError(error, { id });
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
      const requestCache = await SystemRequestCacheService.createOneSafe(
        parsed,
        context
      );
      if (requestCache === null) {
        // key conflict
        let delay = 1000;
        do {
          const { completedAt, response } =
            await SystemRequestCacheService.getOne(parsed, context);
          if (completedAt === null) {
            // exponential backoff
            await wait(delay);
            delay *= 2;
          } else {
            return response as RESULT;
          }
        } while (delay < DB_DELAY_SECONDS * 1000);
        throw createHttpError.RequestTimeout();
      } else {
        // key acquired
        const result = await executor(parsed, context);
        await SystemRequestCacheService.updateOneSafe(
          requestCache,
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
