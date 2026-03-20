import {
  DispatcherOptions,
  commonDispatcherConfig,
  commonHandlerConfig,
} from '@/framework/callbacks';
import { Context, ContextUser } from '@/framework/context';
import { logError } from '@/framework/logging';
import { getFrameworkIntegration } from '@/integration/backend/framework';
import { DispatcherConfig, Executor, wait } from '@airent/api';
import { HandlerConfig } from '@airent/api-next';
import createHttpError from 'http-errors';
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
  const frameworkIntegration = getFrameworkIntegration();

  // load actual current user
  const realCurrentUserPromise = getRealCurrentUser();
  // load became user
  const becameUserPromise = getBecameUser(headers);
  const [realCurrentUser, becameUser] = await Promise.all([
    realCurrentUserPromise,
    becameUserPromise,
  ]);

  const shouldHonorBecameUser = frameworkIntegration.shouldHonorBecameUser
    ? frameworkIntegration.shouldHonorBecameUser(realCurrentUser)
    : frameworkIntegration.isServiceLocal || realCurrentUser?.isAdmin;

  if (shouldHonorBecameUser) {
    return becameUser ?? realCurrentUser;
  }
  return realCurrentUser;
}

export async function getRealCurrentUser(): Promise<ContextUser | null> {
  const email = await getFrameworkIntegration().getSessionEmail();
  // load actual current user
  return email ? await getNullableUserSafe(email) : null;
}

async function getBecameUser(headers: Headers): Promise<ContextUser | null> {
  const { headerCurrentUserIdKey } = getFrameworkIntegration();
  const userId = getCookieHeaderKey(headers, headerCurrentUserIdKey);
  return userId === null ? null : await getNullableUserSafe(userId);
}

async function getNullableUserSafe(id: string): Promise<ContextUser | null> {
  try {
    return await getFrameworkIntegration().getNullableUserSafe(id);
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
    const frameworkIntegration = getFrameworkIntegration();
    const requestCacheIntegration = frameworkIntegration.requestCache;
    const { url } = context;
    const requireRequestCache =
      options?.cacheRequest !== undefined
        ? options.cacheRequest
        : CACHED_REQUEST_PATHS.some((path) => url.includes(path));

    if (requireRequestCache && requestCacheIntegration) {
      const requestCache = await requestCacheIntegration.createOneSafe(
        parsed,
        context
      );
      if (requestCache === null) {
        let delay = 1000;
        const maxDelay =
          (frameworkIntegration.requestCacheDelaySeconds ?? 5) * 1000;
        do {
          const { completedAt, response } =
            await requestCacheIntegration.getOne(parsed, context);
          if (completedAt === null) {
            await wait(delay);
            delay *= 2;
          } else {
            return response as RESULT;
          }
        } while (delay < maxDelay);
        throw createHttpError.RequestTimeout();
      } else {
        const result = await executor(parsed, context);
        await requestCacheIntegration.updateOneSafe(
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
