import { publicConfig } from '@/common/config';
import { CookiesOptions } from 'next-auth';

const secureCookiePrefix =
  publicConfig.service.environment === 'local' ? '' : '__Secure-';
const hostCookiePrefix =
  publicConfig.service.environment === 'local' ? '' : '__Host-';
const SESSION_TOKEN_COOKIE_NAME = `${secureCookiePrefix}next-auth.session-token`;
const CALLBACK_URL_COOKIE_NAME = `${secureCookiePrefix}next-auth.callback-url`;
const CSRF_TOKEN_COOKIE_NAME = `${hostCookiePrefix}next-auth.csrf-token`;

const options = { path: '/', sameSite: 'none' as const, secure: true };

export const cookies: Partial<CookiesOptions> = {
  sessionToken: { name: SESSION_TOKEN_COOKIE_NAME, options },
  csrfToken: { name: CSRF_TOKEN_COOKIE_NAME, options },
  callbackUrl: { name: CALLBACK_URL_COOKIE_NAME, options },
};
