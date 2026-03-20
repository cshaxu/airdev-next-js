// Note: anything added here will be leaked to the public, use caution!

// set constants

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? '@airdev/next';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ?? 'Shared Next.js app platform';
export const APP_OWNER_SHORT =
  process.env.NEXT_PUBLIC_APP_OWNER_SHORT ?? 'Airdev';
export const APP_OWNER = process.env.NEXT_PUBLIC_APP_OWNER ?? 'Airdev';
export const APP_EMAIL = process.env.NEXT_PUBLIC_APP_EMAIL ?? 'dev@example.com';
export const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION ?? '0.0.1';
export const APP_MAIN_URL =
  process.env.NEXT_PUBLIC_APP_MAIN_URL ?? 'http://localhost:3000';
export const APP_LOGO_URL = process.env.NEXT_PUBLIC_APP_LOGO_URL ?? '';

export const DEFAULT_API_BATCH_SIZE = 100;
export const DEFAULT_PAGE_SIZE = 50;

export const HEADER_CURRENT_USER_ID_KEY =
  process.env.NEXT_PUBLIC_HEADER_CURRENT_USER_ID_KEY ?? 'X-CURRENT-USER-ID';
export const HEADER_DATA_ENVIRONMENT_KEY =
  process.env.NEXT_PUBLIC_HEADER_DATA_ENVIRONMENT_KEY ?? 'X-DATA-ENVIRONMENT';
export const HEADER_INTERNET_SECRET_KEY =
  process.env.NEXT_PUBLIC_HEADER_INTERNAL_SECRET_KEY ?? 'X-INTERNAL-SECRET';

// environment definitions

export type Environment = 'local' | 'production';

export const SERVICE_ENVIRONMENT =
  (process.env.NEXT_PUBLIC_SERVICE_ENVIRONMENT as Environment | undefined) ??
  'local';
export const DATA_ENVIRONMENT =
  (process.env.NEXT_PUBLIC_DATA_ENVIRONMENT as Environment | undefined) ??
  SERVICE_ENVIRONMENT;

export const IS_SERVICE_LOCAL = SERVICE_ENVIRONMENT === 'local';
export const IS_SERVICE_PRODUCTION = SERVICE_ENVIRONMENT === 'production';

export const IS_DATA_LOCAL = DATA_ENVIRONMENT === 'local';
export const IS_DATA_PRODUCTION = DATA_ENVIRONMENT === 'production';

// service config

export const SERVICE_NAME = process.env.NEXT_PUBLIC_SERVICE_NAME ?? 'localhost';
export const SERVICE_PROTOCOL =
  process.env.NEXT_PUBLIC_SERVICE_PROTOCOL ?? 'http:';
export const SERVICE_ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_SERVICE_ROOT_DOMAIN ?? 'localhost:3000';
const serviceBaseUrl =
  process.env.NEXT_PUBLIC_SERVICE_BASE_URL ?? 'http://localhost:3000';
export const SERVICE_BASE_URL =
  IS_SERVICE_LOCAL && process.env.NEXT_PUBLIC_LOCAL_HTTPS
    ? serviceBaseUrl.replace('http:', 'https:')
    : serviceBaseUrl;
export const SERVICE_TITLE_PREFIX =
  process.env.NEXT_PUBLIC_SERVICE_TITLE_PREFIX ?? 'Local';

// internal - urls

export const API_CLIENT_BASE_URL =
  typeof window === 'undefined' ? SERVICE_BASE_URL : '';
export const AIRENT_API_CLIENT_BASE_URL = `${API_CLIENT_BASE_URL}/api/data`;
export const baseUrl = AIRENT_API_CLIENT_BASE_URL;

// external - aws
export const AWS_S3_BUCKET = process.env.NEXT_PUBLIC_AWS_S3_BUCKET ?? '';
export const AWS_S3_PATH_USER_UPLOAD = 'user-upload';
export const AWS_S3_PATH_USER_DOWNLOAD = 'user-download';

// external - google
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

// external - posthog
export const POSTHOG_API_TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_API_TOKEN ?? '';
export const POSTHOG_API_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_API_HOST ?? 'https://us.posthog.com';

// external - pusher
export const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY ?? '';
export const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER ?? '';
