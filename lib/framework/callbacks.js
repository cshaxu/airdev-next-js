"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonHandlerConfig = exports.commonDispatcherConfig = void 0;
const framework_1 = require("@airdev/next/adapter/backend/framework");
const config_1 = require("@airdev/next/backend/config");
const config_2 = require("@airdev/next/common/config");
const api_1 = require("@airent/api");
const http_errors_1 = __importDefault(require("http-errors"));
const zod_1 = require("zod");
const HEADER_AUTHORIZATION_KEY = 'authorization';
exports.commonDispatcherConfig = { authorizer, parserWrapper, errorHandler };
exports.commonHandlerConfig = { requestParser, errorHandler };
function requestParser(request) {
    return request;
}
function authorizer(context, options) {
    // require cron
    if (options?.requireCron === true) {
        if (context.headers.get(HEADER_AUTHORIZATION_KEY) ===
            `Bearer ${config_1.privateConfig.cronSecret ?? ''}`) {
            return;
        }
        throw http_errors_1.default.Unauthorized((0, api_1.buildInvalidErrorMessage)('access'));
    }
    // require internal
    if (options?.requireInternal === true) {
        if (context.headers.get(config_2.HEADER_INTERNAL_SECRET_KEY) ===
            (config_1.privateConfig.internalSecret ?? '')) {
            return;
        }
        throw http_errors_1.default.Unauthorized((0, api_1.buildInvalidErrorMessage)('access'));
    }
    // require admin
    if (options?.requireAdmin === true) {
        if (context.currentUser?.isAdmin) {
            return;
        }
        throw http_errors_1.default.Unauthorized((0, api_1.buildInvalidErrorMessage)('access'));
    }
    // require login by default, unless explicitly set to false or require others
    if (options?.requireLogin !== false) {
        if (context.currentUser) {
            return;
        }
        throw http_errors_1.default.Unauthorized((0, api_1.buildInvalidErrorMessage)('access'));
    }
}
function parserWrapper(parser) {
    return async (request, context) => {
        try {
            return await parser(request, context);
        }
        catch (error) {
            if (error instanceof http_errors_1.default.HttpError ||
                error instanceof zod_1.ZodError) {
                throw error;
            }
            else {
                throw http_errors_1.default.BadRequest(error.message);
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
    const normalizedError = framework_1.frameworkAdapter.normalizeError(error);
    framework_1.frameworkAdapter.logError(normalizedError, redactedDc);
    if (config_2.publicConfig.service.environment === 'production') {
        delete normalizedError['original'];
        delete normalizedError['stack'];
    }
    return { code: normalizedError.status, error: normalizedError };
}
const selectedHeaderKeys = ['referer', 'user-agent'];
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
    'cookie',
    'X-INTERNAL-SECRET',
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