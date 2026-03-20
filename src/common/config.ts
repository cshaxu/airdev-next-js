// Note: anything added here will be leaked to the public, use caution!

import PublicConfig from '../../public.config.json';

// set constants

export const APP_NAME = 'Barebone Next';
export const APP_DESCRIPTION = 'Next.js App Template';
export const APP_OWNER_SHORT = 'Nano Indies';
export const APP_OWNER = 'Nano Indies, Inc.';
export const APP_EMAIL = 'dev@nanoindies.com';
export const APP_VERSION = '0.0.1';
export const APP_MAIN_URL = 'https://www.nanoindies.com';
export const APP_LOGO_URL =
  'https://avatars.githubusercontent.com/u/5317739?v=4&size=64';

export const DEFAULT_API_BATCH_SIZE = 100;
export const DEFAULT_PAGE_SIZE = 50;

export const HEADER_CURRENT_USER_ID_KEY = 'X-CURRENT-USER-ID';
export const HEADER_DATA_ENVIRONMENT_KEY = 'X-DATA-ENVIRONMENT';
export const HEADER_INTERNET_SECRET_KEY = 'X-INTERNAL-SECRET';

// environment definitions

export type Environment = 'local' /* | 'development' */ | 'production';

export const SERVICE_ENVIRONMENT = process.env
  .NEXT_PUBLIC_BAREBONE_NEXT_SERVICE_ENVIRONMENT as Environment;
export const DATA_ENVIRONMENT = process.env
  .NEXT_PUBLIC_BAREBONE_NEXT_DATA_ENVIRONMENT as Environment;

export const IS_SERVICE_LOCAL = SERVICE_ENVIRONMENT === 'local';
// export const IS_SERVICE_DEVELOPMENT = SERVICE_ENVIRONMENT === 'development';
export const IS_SERVICE_PRODUCTION = SERVICE_ENVIRONMENT === 'production';

export const IS_DATA_LOCAL = DATA_ENVIRONMENT === 'local';
// export const IS_DATA_DEVELOPMENT = DATA_ENVIRONMENT === 'development';
export const IS_DATA_PRODUCTION = DATA_ENVIRONMENT === 'production';

// service config

const { data: publicDataConfig, service: publicServiceConfig } = PublicConfig;
const { common: publicCommonDataConfig } = publicDataConfig;
const publicEnvironmentalServiceConfig =
  publicServiceConfig[SERVICE_ENVIRONMENT];
const publicEnvironmentalDataConfig = publicDataConfig[DATA_ENVIRONMENT];

// internal - service

export const SERVICE_NAME = publicEnvironmentalServiceConfig.name;
export const SERVICE_PROTOCOL = publicEnvironmentalServiceConfig.protocol;
export const SERVICE_ROOT_DOMAIN = publicEnvironmentalServiceConfig.rootDomain;
export const SERVICE_BASE_URL =
  IS_SERVICE_LOCAL && process.env.NEXT_PUBLIC_LOCAL_HTTPS
    ? publicEnvironmentalServiceConfig.baseUrl.replace('http:', 'https:')
    : publicEnvironmentalServiceConfig.baseUrl;
export const SERVICE_TITLE_PREFIX =
  publicEnvironmentalServiceConfig.titlePrefix;

// internal - urls

export const API_CLIENT_BASE_URL =
  typeof window === 'undefined' ? SERVICE_BASE_URL : '';
export const AIRENT_API_CLIENT_BASE_URL = `${API_CLIENT_BASE_URL}/api/data`;
export const baseUrl = AIRENT_API_CLIENT_BASE_URL;

// external - aws
export const AWS_S3_BUCKET = publicEnvironmentalDataConfig.aws.s3Bucket;
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
export const POSTHOG_API_TOKEN = publicCommonDataConfig.posthog.apiToken;
export const POSTHOG_API_HOST = publicCommonDataConfig.posthog.apiHost;

// external - pusher
export const PUSHER_KEY = publicCommonDataConfig.pusher.key;
export const PUSHER_CLUSTER = publicCommonDataConfig.pusher.cluster;
