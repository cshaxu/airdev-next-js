import type { Adapter } from 'next-auth/adapters';
import type { ComponentType } from 'react';
import type { DatabaseAdapter } from './backend/data/types';
import type { FrameworkAdapter } from './backend/framework/types';
import type { NextauthAdapter } from './backend/nextauth/types';
import type { ApiClientAdapter } from './frontend/api-client/types';
import type { ClientQueryAdapter } from './frontend/query/types';
import type { ServerApiClientAdapter } from './frontend/server-api-client/types';
import type { ShellAdapter } from './frontend/shell/types';
import type { PrivateConfig } from './private-config/types';
import type { PublicConfig } from './public-config/types';

function missingAdapter(name: string): never {
  throw new Error(
    `@airdev/next adapter "${name}" has not been initialized in the consumer app.`
  );
}

const MissingComponent: ComponentType = () => missingAdapter('shell.component');

const MissingNextAuthAdapter: Adapter = {
  createUser: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
  getUser: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
  getUserByEmail: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
  getUserByAccount: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
  updateUser: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
  deleteUser: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
  linkAccount: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
  unlinkAccount: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
  createSession: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
  getSessionAndUser: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
  updateSession: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
  deleteSession: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
  createVerificationToken: () =>
    missingAdapter('nextauthAdapter.nextAuthAdapter'),
  useVerificationToken: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
};

export const defaultPublicConfig: PublicConfig = {
  app: {
    name: 'Airdev',
    owner: 'Airdev',
    ownerShort: 'Airdev',
    mainUrl: 'http://localhost:3000',
    email: 'hello@example.com',
    description: '',
  },
  auth: { verificationCodeLength: 5 },
  posthog: { apiHost: '', apiToken: '' },
  service: {
    environment: 'local',
    rootDomain: 'localhost',
    titlePrefix: '',
  },
};

export const defaultPrivateConfig: PrivateConfig = {
  cronSecret: '',
  internalSecret: '',
  defaultDbBatchSize: 100,
  defaultApiBatchSize: 100,
  defaultPageSize: 20,
  cacheRequestPathPrefixes: [],
};

export const defaultFrameworkAdapter: FrameworkAdapter = {
  logError: (error, context) => {
    console.error(error, context);
  },
  normalizeError: (error) => ({
    name: error instanceof Error ? error.name : 'Error',
    status: 500,
    message: error instanceof Error ? error.message : 'Unknown error',
    original: error,
  }),
};

export const defaultNextauthAdapter: NextauthAdapter = {
  sessionMaxAge: 60 * 60 * 24 * 30,
  signInPath: '/auth/signin',
  errorPath: '/auth/error',
  nextAuthAdapter: MissingNextAuthAdapter,
  getNextAuthAdapter: () => MissingNextAuthAdapter,
};

export const defaultApiClientAdapter: ApiClientAdapter = {
  becomeUser: () => missingAdapter('apiClientAdapter.becomeUser'),
  getNullableCurrentUser: () =>
    missingAdapter('apiClientAdapter.getNullableCurrentUser'),
};

export const defaultServerApiClientAdapter: ServerApiClientAdapter = {
  fetchCurrentUser: () =>
    missingAdapter('serverApiClientAdapter.fetchCurrentUser'),
};

export const defaultClientQueryAdapter: ClientQueryAdapter = {
  getManyUsersQueryOptions: (query) => ({
    queryKey: ['users', query],
    queryFn: () =>
      missingAdapter('clientQueryAdapter.getManyUsersQueryOptions'),
  }),
  useUpdateOneUser: (() =>
    missingAdapter(
      'clientQueryAdapter.useUpdateOneUser'
    )) as ClientQueryAdapter['useUpdateOneUser'],
  useDeleteOneUser: (() =>
    missingAdapter(
      'clientQueryAdapter.useDeleteOneUser'
    )) as ClientQueryAdapter['useDeleteOneUser'],
  useCreateOneNextauthVerificationToken: (() =>
    missingAdapter(
      'clientQueryAdapter.useCreateOneNextauthVerificationToken'
    )) as ClientQueryAdapter['useCreateOneNextauthVerificationToken'],
};

export const defaultShellAdapter: ShellAdapter = {
  navigation: {
    primaryItems: [],
    adminTabItems: [],
    homeHref: '/',
    adminHref: '/admin',
    settingsHref: '/settings',
    privacyHref: '/privacy',
    termsHref: '/terms',
    logoutCallbackUrl: '/',
  },
  component: {
    logoSrc: '',
    LandingComponent: MissingComponent,
    AirentApiNextStudioComponent: MissingComponent,
  },
};

export const defaultDatabaseAdapter: DatabaseAdapter = {
  getOneUserSafe: () => missingAdapter('databaseAdapter.getOneUserSafe'),
  createOneUser: () => missingAdapter('databaseAdapter.createOneUser'),
  updateOneUser: () => missingAdapter('databaseAdapter.updateOneUser'),
  getOneNextauthAccountSafe: () =>
    missingAdapter('databaseAdapter.getOneNextauthAccountSafe'),
  updateOneNextauthAccount: () =>
    missingAdapter('databaseAdapter.updateOneNextauthAccount'),
  createOneNextauthSession: () =>
    missingAdapter('databaseAdapter.createOneNextauthSession'),
  deleteOneNextauthVerificationTokenSafe: () =>
    missingAdapter('databaseAdapter.deleteOneNextauthVerificationTokenSafe'),
  getOneRequestCache: () =>
    missingAdapter('databaseAdapter.getOneRequestCache'),
  createOneRequestCacheSafe: () =>
    missingAdapter('databaseAdapter.createOneRequestCacheSafe'),
  updateOneRequestCacheSafe: () =>
    missingAdapter('databaseAdapter.updateOneRequestCacheSafe'),
};
