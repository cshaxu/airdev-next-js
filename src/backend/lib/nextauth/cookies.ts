import { publicConfig } from '@airdev/next/common/config';
import { CookiesOptions } from 'next-auth';

function buildCookieOptions() {
  const isLocal = publicConfig.service.environment === 'local';
  const secureCookiePrefix = isLocal ? '' : '__Secure-';
  const hostCookiePrefix = isLocal ? '' : '__Host-';
  const options = {
    path: '/',
    sameSite: (isLocal ? 'lax' : 'none') as 'lax' | 'none',
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
  } satisfies Partial<CookiesOptions>;
}

export const SESSION_TOKEN_COOKIE_NAME =
  publicConfig.service.environment === 'local'
    ? 'next-auth.session-token'
    : '__Secure-next-auth.session-token';

export const cookies: Partial<CookiesOptions> = {};

Object.defineProperties(cookies, {
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
