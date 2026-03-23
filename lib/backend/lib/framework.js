"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlerConfig = exports.dispatcherConfig = exports.mockContext = void 0;
exports.getRealCurrentUser = getRealCurrentUser;
const data_1 = require("@airdev/next/adapter/backend/data");
const framework_1 = require("@airdev/next/adapter/backend/framework");
const config_1 = require("@airdev/next/backend/config");
const config_2 = require("@airdev/next/common/config");
const callbacks_1 = require("@airdev/next/framework/callbacks");
const context_1 = require("@airdev/next/framework/context");
const api_1 = require("@airent/api");
const http_errors_1 = __importDefault(require("http-errors"));
const lodash_es_1 = require("lodash-es");
const next_auth_1 = require("next-auth");
const nextauth_1 = require("./nextauth");
var context_2 = require("@airdev/next/framework/context");
Object.defineProperty(exports, "mockContext", { enumerable: true, get: function () { return context_2.mockContext; } });
exports.dispatcherConfig = { ...callbacks_1.commonDispatcherConfig, executorWrapper };
exports.handlerConfig = {
    ...callbacks_1.commonHandlerConfig,
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
    if (config_2.publicConfig.service.environment === 'local' ||
        realCurrentUser?.isAdmin) {
        return becameUser ?? realCurrentUser;
    }
    return realCurrentUser;
}
async function getRealCurrentUser() {
    const session = await (0, next_auth_1.getServerSession)(nextauth_1.authOptions);
    const email = session?.user?.email ?? null;
    // load actual current user
    return email ? await getNullableUserSafe(email) : null;
}
async function getBecameUser(headers) {
    const userId = getCookieHeaderKey(headers, config_2.HEADER_CURRENT_USER_ID_KEY);
    return userId === null ? null : await getNullableUserSafe(userId);
}
async function getNullableUserSafe(id) {
    try {
        const context = await (0, context_1.mockContext)();
        const user = await data_1.databaseAdapter.getOneUserSafe({ id }, context);
        if (user === null) {
            return null;
        }
        return (0, lodash_es_1.pick)(user, [
            'id',
            'email',
            'name',
            'imageUrl',
            'isAdmin',
            'createdAt',
        ]);
    }
    catch (error) {
        framework_1.frameworkAdapter.logError(error, { id });
        return null;
    }
}
function getCookieHeaderKey(headers, key) {
    const cookieUserId = (headers.get('cookie') ?? '')
        .split(';')
        .map((s) => s.trim().split('='))
        .filter(([k, _v]) => k === key)
        .map(([_k, v]) => v)
        .at(0) ?? null;
    const headerUserId = headers.get(key);
    return cookieUserId ?? headerUserId;
}
function executorWrapper(executor, options) {
    return async (parsed, context) => {
        const { url } = context;
        const requireRequestCache = options?.cacheRequest !== undefined
            ? options.cacheRequest
            : config_1.privateConfig.cacheRequestPathPrefixes.some((path) => url.includes(path));
        if (requireRequestCache) {
            const requestCache = await data_1.databaseAdapter.createOneRequestCacheSafe(parsed, context);
            if (requestCache === null) {
                // key conflict
                let delay = 1000;
                const maxDelay = 5 * 1000;
                do {
                    const { completedAt, response } = await data_1.databaseAdapter.getOneRequestCache(parsed, context);
                    if (completedAt === null) {
                        // exponential backoff
                        await (0, api_1.wait)(delay);
                        delay *= 2;
                    }
                    else {
                        return response;
                    }
                } while (delay < maxDelay);
                throw http_errors_1.default.RequestTimeout();
            }
            else {
                // key acquired
                const result = await executor(parsed, context);
                await data_1.databaseAdapter.updateOneRequestCacheSafe(requestCache, result, context);
                return result;
            }
        }
        return await executor(parsed, context);
    };
}
//# sourceMappingURL=framework.js.map