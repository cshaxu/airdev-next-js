import type { PrivateConfig } from '@/adapter/private-config';
import type { PublicConfig } from '@/adapter/public-config';

export const bootstrapPublicConfig: PublicConfig = {
  app: {
    description: 'Shared Next.js app platform',
    email: 'dev@example.com',
    mainUrl: 'http://localhost:3000',
    name: '@airdev/next',
    owner: 'Airdev',
    ownerShort: 'Airdev',
  },
  auth: { verificationCodeLength: 5 },
  posthog: {
    apiHost: 'https://us.posthog.com',
    apiToken: '',
  },
  service: {
    environment: 'local',
    rootDomain: 'localhost:3000',
    titlePrefix: 'Local',
  },
};

export const bootstrapPrivateConfig: PrivateConfig = {
  cronSecret: '',
  internalSecret: '',
  defaultDbBatchSize: 1000,
  defaultApiBatchSize: 100,
  defaultPageSize: 50,
  cacheRequestPathPrefixes: [
    '/data/create-one-',
    '/data/update-one-',
    '/data/delete-one-',
  ],
};
