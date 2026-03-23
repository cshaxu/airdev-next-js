"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookies = exports.SESSION_TOKEN_COOKIE_NAME = void 0;
const config_1 = require("@airdev/next/common/config");
function buildCookieOptions() {
    const isLocal = config_1.publicConfig.service.environment === 'local';
    const secureCookiePrefix = isLocal ? '' : '__Secure-';
    const hostCookiePrefix = isLocal ? '' : '__Host-';
    const options = {
        path: '/',
        sameSite: (isLocal ? 'lax' : 'none'),
        secure: !isLocal,
    };
    return {
        sessionToken: {
            name: `${secureCookiePrefix}next-auth.session-token`,
            options,
        },
        csrfToken: {
            name: `${hostCookiePrefix}next-auth.csrf-token`,
            options,
        },
        callbackUrl: {
            name: `${secureCookiePrefix}next-auth.callback-url`,
            options,
        },
    };
}
exports.SESSION_TOKEN_COOKIE_NAME = config_1.publicConfig.service.environment === 'local'
    ? 'next-auth.session-token'
    : '__Secure-next-auth.session-token';
exports.cookies = {};
Object.defineProperties(exports.cookies, {
    sessionToken: {
        enumerable: true,
        configurable: true,
        get() {
            return buildCookieOptions().sessionToken;
        },
    },
    csrfToken: {
        enumerable: true,
        configurable: true,
        get() {
            return buildCookieOptions().csrfToken;
        },
    },
    callbackUrl: {
        enumerable: true,
        configurable: true,
        get() {
            return buildCookieOptions().callbackUrl;
        },
    },
});
//# sourceMappingURL=cookies.js.map