import { HEADER_AUTHORIZATION_KEY, HEADER_COOKIE_KEY, HEADER_INTERNAL_SECRET_KEY, HEADER_REFERER_KEY, HEADER_USER_AGENT_KEY, } from '../common/constant';
import { edgeConfig } from '@/config/edge';
import { commonFunctionConfig } from '@/config/function/common';
import { publicConfig } from '@/config/public';
import { buildInvalidErrorMessage, logError, } from '@airent/api';
import createHttpError from 'http-errors';
import { ZodError } from 'zod';
export const commonDispatcherConfig = { authorizer, parserWrapper, errorHandler };
export const commonHandlerConfig = { requestParser, errorHandler };
function requestParser(request) {
    return request;
}
function authorizer(context, options) {
    // require cron
    if (options?.requireCron === true) {
        if (context.headers.get(HEADER_AUTHORIZATION_KEY) ===
            `Bearer ${edgeConfig.cronSecret}`) {
            return;
        }
        throw createHttpError.Unauthorized(buildInvalidErrorMessage('access'));
    }
    // require internal
    if (options?.requireInternal === true) {
        if (context.headers.get(HEADER_INTERNAL_SECRET_KEY) ===
            edgeConfig.internalSecret) {
            return;
        }
        throw createHttpError.Unauthorized(buildInvalidErrorMessage('access'));
    }
    // require admin
    if (options?.requireAdmin === true) {
        if (context.currentUser?.isAdmin) {
            return;
        }
        throw createHttpError.Unauthorized(buildInvalidErrorMessage('access'));
    }
    // require login by default, unless explicitly set to false or require others
    if (options?.requireLogin !== false) {
        if (context.currentUser) {
            return;
        }
        throw createHttpError.Unauthorized(buildInvalidErrorMessage('access'));
    }
}
function parserWrapper(parser) {
    return async (request, context) => {
        try {
            return await parser(request, context);
        }
        catch (error) {
            if (error instanceof createHttpError.HttpError ||
                error instanceof ZodError) {
                throw error;
            }
            else {
                throw createHttpError.BadRequest(error.message);
            }
        }
    };
}
function errorHandler(error, dc) {
    const { context, ...dcRest } = dc;
    const { headers, ...rcRest } = context ?? {};
    const redactedDc = {
        ...rcRest,
        selectedHeaders: selectHeaders(headers),
        ...dcRest,
        redactedHeaders: redactHeaders(headers),
    };
    const normalizedError = commonFunctionConfig.normalizeError(error);
    logError(normalizedError, redactedDc);
    if (publicConfig.service.serviceEnvironment === 'production') {
        delete normalizedError['original'];
        delete normalizedError['stack'];
    }
    return { code: normalizedError.status, error: normalizedError };
}
const selectedHeaderKeys = [HEADER_REFERER_KEY, HEADER_USER_AGENT_KEY];
const selectHeaders = (headers) => headers === undefined
    ? {}
    : Array.from(headers.entries())
        .filter(([key, _]) => selectedHeaderKeys.includes(key))
        .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
const excludedHeaderKeys = [
    ...selectedHeaderKeys,
    HEADER_COOKIE_KEY,
    HEADER_INTERNAL_SECRET_KEY.toLowerCase(),
];
const redactHeaders = (headers) => headers === undefined
    ? {}
    : Array.from(headers.entries())
        .filter(([key, _]) => !excludedHeaderKeys.includes(key))
        .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
    }, {});
//# sourceMappingURL=callbacks.js.map