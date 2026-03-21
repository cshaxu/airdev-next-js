// Note: anything added here will be leaked to the public, use caution!

export {
  publicConfigAdapter as publicConfig,
  type Environment,
} from '@/adapter/public-config';

export const HEADER_CURRENT_USER_ID_KEY = 'X-CURRENT-USER-ID';
export const HEADER_INTERNAL_SECRET_KEY = 'X-INTERNAL-SECRET';

export const GOOGLE_OAUTH_SCOPE_OPENID = 'openid';
export const GOOGLE_OAUTH_SCOPE_USERINFO_EMAIL =
  'https://www.googleapis.com/auth/userinfo.email';
export const GOOGLE_OAUTH_SCOPE_USERINFO_PROFILE =
  'https://www.googleapis.com/auth/userinfo.profile';

export const GOOGLE_OAUTH_SIGNIN_SCOPES = [
  GOOGLE_OAUTH_SCOPE_OPENID,
  GOOGLE_OAUTH_SCOPE_USERINFO_EMAIL,
  GOOGLE_OAUTH_SCOPE_USERINFO_PROFILE,
];
