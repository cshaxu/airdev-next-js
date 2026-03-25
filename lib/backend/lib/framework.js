import { mockContext } from '../utils/context.js';
import { buildContextUserFromPackageUser } from '../utils/user.js';
import { HEADER_COOKIE_KEY, HEADER_CURRENT_USER_ID_KEY, } from '../../common/constant.js';
import { backendFunctionConfig } from '@/config/function/backend';
import { commonFunctionConfig } from '@/config/function/common';
import { privateConfig } from '@/config/private';
import { publicConfig } from '@/config/public';
import { commonDispatcherConfig, commonHandlerConfig, } from '../../framework/callbacks.js';
import { wait } from '@airent/api';
import createHttpError from 'http-errors';
import { getServerSession } from 'next-auth';
import { authOptions } from './nextauth.js';
export const dispatcherConfig = { ...commonDispatcherConfig, executorWrapper };
export const handlerConfig = {
    ...commonHandlerConfig,
    authenticator,
};
async function authenticator(request) {
    const time = new Date();
    const { method, url, headers } = request;
    const currentUser = await getCurrentUser(headers);
    return { time, method, url, headers, currentUser };
}
async function getCurrentUser(headers) {
    // load actual current user
    const realCurrentUserPromise = getRealCurrentUser();
    // load became user
    const becameUserPromise = getBecameUser(headers);
    const [realCurrentUser, becameUser] = await Promise.all([
        realCurrentUserPromise,
        becameUserPromise,
    ]);
    if (publicConfig.service.serviceEnvironment === 'local' ||
        realCurrentUser?.isAdmin) {
        return becameUser ?? realCurrentUser;
    }
    return realCurrentUser;
}
export async function getRealCurrentUser() {
    const session = await getServerSession(authOptions);
    const { email } = session?.user ?? {};
    // load actual current user
    return email ? await getNullableUserSafe(email) : null;
}
async function getBecameUser(headers) {
    const userId = getCookieHeaderKey(headers, HEADER_CURRENT_USER_ID_KEY);
    return userId === null ? null : await getNullableUserSafe(userId);
}
async function getNullableUserSafe(id) {
    try {
        const context = await mockContext();
        const user = await backendFunctionConfig.user.getOneSafe(id, context);
        if (user === null) {
            return null;
        }
        return buildContextUserFromPackageUser(user);
    }
    catch (error) {
        commonFunctionConfig.logError(error, { id });
        return null;
    }
}
function getCookieHeaderKey(headers, key) {
    const cookierUserId = (headers.get(HEADER_COOKIE_KEY) ?? '')
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
function executorWrapper(executor, options) {
    return async (parsed, context) => {
        const { url } = context;
        const requireRequestCache = options?.cacheRequest !== undefined
            ? options.cacheRequest
            : CACHED_REQUEST_PATHS.some((path) => url.includes(path));
        if (requireRequestCache) {
            const requestCache = await backendFunctionConfig.systemRequestCache.createOneSafe(parsed, context);
            if (requestCache === null) {
                // key conflict
                let delay = 1000;
                do {
                    const { completedAt, response } = await backendFunctionConfig.systemRequestCache.getOne(parsed, context);
                    if (completedAt === null) {
                        // exponential backoff
                        await wait(delay);
                        delay *= 2;
                    }
                    else {
                        return response;
                    }
                } while (delay < privateConfig.database.delaySeconds * 1000);
                throw createHttpError.RequestTimeout();
            }
            else {
                // key acquired
                const result = await executor(parsed, context);
                await backendFunctionConfig.systemRequestCache.updateOneSafe(requestCache.id, result, context);
                return result;
            }
        }
        else {
            return await executor(parsed, context);
        }
    };
}
//# sourceMappingURL=framework.js.map