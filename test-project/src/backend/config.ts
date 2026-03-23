import { decrypt } from 'databag';
import dns from 'node:dns';
import EncryptedPrivateConfig from '../../private.config.json';
import {
  DATA_ENVIRONMENT,
  DEFAULT_API_BATCH_SIZE,
  DEFAULT_PAGE_SIZE,
  SERVICE_ENVIRONMENT,
} from '../common/config';
import { CRON_SECRET, INTERNAL_SECRET } from '../edge/config';

// enforce fetch api to prefer ipv4 over ipv6
// so localhost can be resolved correctly
dns.setDefaultResultOrder('ipv4first');

export const ADMIN_EMAILS = ['cshaxu@gmail.com'];

const DATABAG_PASSWORD = process.env.BAREBONE_NEXT_DATABAG_PASSWORD!;

const PrivateConfig = decrypt(EncryptedPrivateConfig, DATABAG_PASSWORD);
const { data: PrivateDataConfig, service: PrivateServiceConfig } =
  PrivateConfig;
const { common: privateCommonDataConfig } = PrivateDataConfig;
const privateEnvironmentalDataConfig = PrivateDataConfig[DATA_ENVIRONMENT];
const privateEnvironmentalServiceConfig =
  PrivateServiceConfig[SERVICE_ENVIRONMENT];

// internal - constants
export const DEFAULT_DB_BATCH_SIZE = 1000;
export const NEXTAUTH_SESSION_MAX_AGE = 30 * 24 * 60 * 60;
export const DB_DELAY_SECONDS = 5;
export const MAX_PUSH_DEVICES = 5;

// internal - secrets
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!;

// internal - database
export const DATABASE_URL = privateEnvironmentalDataConfig.databaseUrl;

// external - google
export const GOOGLE_CLIENT_ID =
  privateEnvironmentalServiceConfig.google.clientId;
export const GOOGLE_CLIENT_SECRET =
  privateEnvironmentalServiceConfig.google.clientSecret;

// external - openai
export const OPENAI_API_KEY = privateCommonDataConfig.openai.apiKey;
export const OPENAI_CHAT_MODEL = 'gpt-4o-mini'; // max input is 128,000 and max output is 16,384
export const OPENAI_TRANSCRIBE_MODEL = 'gpt-4o-transcribe';
export const OPENAI_AUDIO_JUDGE_MODEL = 'gpt-4o-audio-preview';

// external - openai
export const MAX_CHAT_TOKEN_LIMIT = 16_384;
export const OPENAI_EMBEDDING_MODEL = 'text-embedding-3-small';

// external - postmark
export const POSTMARK_API_TOKEN = privateCommonDataConfig.postmark.apiToken;
export const POSTMARK_WEBHOOK_SECRET =
  privateCommonDataConfig.postmark.webhookSecret;
export const POSTMARK_WEBHOOK_SECRET_HEADER_KEY = 'X-POSTMARK-WEBHOOK-SECRET';
export const POSTMARK_STREAM_TRANSACTIONAL_DEFAULT = 'outbound';
export const POSTMARK_STREAM_BROADCAST_DEFAULT = 'broadcast';

// external - typesense
export const TYPESENSE_API_KEY =
  privateEnvironmentalDataConfig.typesense.apiKey;
export const TYPESENSE_HOST = privateEnvironmentalDataConfig.typesense.host;
export const TYPESENSE_PROTOCOL = 'https';
export const TYPESENSE_PORT = 443;

export const privateConfig = {
  cronSecret: CRON_SECRET,
  internalSecret: INTERNAL_SECRET,
  defaultDbBatchSize: DEFAULT_DB_BATCH_SIZE,
  defaultApiBatchSize: DEFAULT_API_BATCH_SIZE,
  defaultPageSize: DEFAULT_PAGE_SIZE,
  cacheRequestPathPrefixes: [
    '/data/create-one-',
    '/data/update-one-',
    '/data/delete-one-',
  ],
} as const;
