"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultDatabaseAdapter = exports.defaultShellAdapter = exports.defaultClientQueryAdapter = exports.defaultServerApiClientAdapter = exports.defaultApiClientAdapter = exports.defaultNextauthAdapter = exports.defaultFrameworkAdapter = exports.defaultPrivateConfig = exports.defaultPublicConfig = void 0;
function missingAdapter(name) {
    throw new Error(`@airdev/next adapter "${name}" has not been initialized in the consumer app.`);
}
const MissingComponent = () => missingAdapter('shell.component');
const MissingNextAuthAdapter = {
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
    createVerificationToken: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
    useVerificationToken: () => missingAdapter('nextauthAdapter.nextAuthAdapter'),
};
exports.defaultPublicConfig = {
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
exports.defaultPrivateConfig = {
    cronSecret: '',
    internalSecret: '',
    defaultDbBatchSize: 100,
    defaultApiBatchSize: 100,
    defaultPageSize: 20,
    cacheRequestPathPrefixes: [],
};
exports.defaultFrameworkAdapter = {
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
exports.defaultNextauthAdapter = {
    sessionMaxAge: 60 * 60 * 24 * 30,
    signInPath: '/auth/signin',
    errorPath: '/auth/error',
    nextAuthAdapter: MissingNextAuthAdapter,
    getNextAuthAdapter: () => MissingNextAuthAdapter,
};
exports.defaultApiClientAdapter = {
    becomeUser: () => missingAdapter('apiClientAdapter.becomeUser'),
    getNullableCurrentUser: () => missingAdapter('apiClientAdapter.getNullableCurrentUser'),
};
exports.defaultServerApiClientAdapter = {
    fetchCurrentUser: () => missingAdapter('serverApiClientAdapter.fetchCurrentUser'),
};
exports.defaultClientQueryAdapter = {
    getManyUsersQueryOptions: (query) => ({
        queryKey: ['users', query],
        queryFn: () => missingAdapter('clientQueryAdapter.getManyUsersQueryOptions'),
    }),
    useUpdateOneUser: (() => missingAdapter('clientQueryAdapter.useUpdateOneUser')),
    useDeleteOneUser: (() => missingAdapter('clientQueryAdapter.useDeleteOneUser')),
    useCreateOneNextauthVerificationToken: (() => missingAdapter('clientQueryAdapter.useCreateOneNextauthVerificationToken')),
};
exports.defaultShellAdapter = {
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
exports.defaultDatabaseAdapter = {
    getOneUserSafe: () => missingAdapter('databaseAdapter.getOneUserSafe'),
    createOneUser: () => missingAdapter('databaseAdapter.createOneUser'),
    updateOneUser: () => missingAdapter('databaseAdapter.updateOneUser'),
    getOneNextauthAccountSafe: () => missingAdapter('databaseAdapter.getOneNextauthAccountSafe'),
    updateOneNextauthAccount: () => missingAdapter('databaseAdapter.updateOneNextauthAccount'),
    createOneNextauthSession: () => missingAdapter('databaseAdapter.createOneNextauthSession'),
    deleteOneNextauthVerificationTokenSafe: () => missingAdapter('databaseAdapter.deleteOneNextauthVerificationTokenSafe'),
    getOneRequestCache: () => missingAdapter('databaseAdapter.getOneRequestCache'),
    createOneRequestCacheSafe: () => missingAdapter('databaseAdapter.createOneRequestCacheSafe'),
    updateOneRequestCacheSafe: () => missingAdapter('databaseAdapter.updateOneRequestCacheSafe'),
};
//# sourceMappingURL=defaults.js.map