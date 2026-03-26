import { publicConfig } from '@/config/json/public';
const isServiceLocal = publicConfig.service.serviceEnvironment === 'local';
const secureCookiePrefix = isServiceLocal ? '' : '__Secure-';
const hostCookiePrefix = isServiceLocal ? '' : '__Host-';
const SESSION_TOKEN_COOKIE_NAME = `${secureCookiePrefix}next-auth.session-token`;
const CALLBACK_URL_COOKIE_NAME = `${secureCookiePrefix}next-auth.callback-url`;
const CSRF_TOKEN_COOKIE_NAME = `${hostCookiePrefix}next-auth.csrf-token`;
const options = { path: '/', sameSite: 'none', secure: true };
export const cookies = {
    sessionToken: { name: SESSION_TOKEN_COOKIE_NAME, options },
    csrfToken: { name: CSRF_TOKEN_COOKIE_NAME, options },
    callbackUrl: { name: CALLBACK_URL_COOKIE_NAME, options },
};
//# sourceMappingURL=cookies.js.map