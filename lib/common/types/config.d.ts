import type { PackageNextauthAccount, PackageNextauthVerificationToken, PackageSystemRequestCache, PackageUser } from '../../backend/types/data.js';
import type { CurrentUser } from './context.js';
import type { Context, ContextUser } from '../../framework/context.js';
import type { NormalizedError } from '@airent/api';
import type { Adapter } from 'next-auth/adapters';
import type { ComponentType, ReactNode } from 'react';
export type ServiceEnvironment = 'local' | 'production' | (string & {});
export type PublicConfig = {
    app: {
        name: string;
        description: string;
        owner: string;
        ownerShort: string;
        email: string;
        welcomeText: string;
        keywords: string[];
        categories: string[];
    };
    service: {
        baseUrl: string;
        rootDomain: string;
        titlePrefix: string;
        serviceEnvironment: ServiceEnvironment;
    };
    defaults: {
        apiBatchSize: number;
        pageSize: number;
    };
    shell: {
        routes: {
            homeHref: string;
            disallowRobots: string[];
        };
        assets: {
            logoSrc: string;
            iconSrc: string;
        };
        adminTabs: PublicConfigAdminTab[];
    };
    posthog: {
        apiToken: string;
        apiHost: string;
    };
};
export type PublicConfigAdminTab = {
    href: string;
    label: string;
};
export type PrivateConfig = {
    database: {
        batchSize: number;
        delaySeconds: number;
    };
    nextauth: {
        sessionMaxAge: number;
    };
    google: {
        clientId: string;
        clientSecret: string;
    };
};
export type EdgeConfig = {
    cronSecret: string;
    internalSecret: string;
};
export type CommonFunctionConfig = {
    logError(error: unknown, metadata?: unknown): void;
    normalizeError(error: unknown): NormalizedError;
};
export type AuthSignInProvider = 'google' | 'credentials' | (string & {});
export type AuthSignInOptions = {
    callbackUrl?: string;
    [key: string]: unknown;
};
export type AuthSignOutOptions = {
    callbackUrl?: string;
    redirect?: boolean;
};
export type AuthApiClientConfig = {
    signIn(provider: AuthSignInProvider, options?: AuthSignInOptions): Promise<unknown>;
    signOut(options?: AuthSignOutOptions): Promise<unknown>;
    become(userId: string | null): Promise<unknown>;
};
export type FieldRequest = Record<string, boolean>;
export type CurrentUserPage<TUser> = {
    user: TUser | null;
};
export type ClientUserUpdateBody = {
    name?: string;
    setAdmin?: boolean;
};
export type ClientUserApiClientConfig<TUser = CurrentUser, TFieldRequest extends FieldRequest = FieldRequest> = {
    getOneSafe(params: {
        id: string;
    }, fields: TFieldRequest): Promise<CurrentUserPage<TUser>>;
};
export type ServerUserApiClientConfig<TUser = CurrentUser, TFieldRequest extends FieldRequest = FieldRequest> = {
    getOneSafe(params: {
        id: string;
    }, fields: TFieldRequest): Promise<CurrentUserPage<TUser>>;
};
export type EdgeUserApiClientConfig<TUser = ContextUser, TFieldRequest extends FieldRequest = FieldRequest> = {
    getOneSafe(params: {
        id: string;
    }, fields: TFieldRequest, headers?: Headers): Promise<CurrentUserPage<TUser>>;
};
export type MutationHookOptions<TData = unknown> = {
    onSuccess?: (data: TData) => void | Promise<void>;
    onError?: (error: unknown) => void | Promise<void>;
};
export type MutationHookResult<TVariables = void, TData = unknown> = {
    isPending: boolean;
    mutate(variables: TVariables, options?: MutationHookOptions<TData>): void | Promise<void>;
    mutateAsync(variables: TVariables, options?: MutationHookOptions<TData>): Promise<TData>;
};
export type NextauthVerificationTokenQueryConfig = {
    useCreateOne(): MutationHookResult<{
        email: string;
    }, unknown>;
};
export type UserQueryConfig<TSearchUser = unknown, TUpdateUser = CurrentUser, TUpdateBody = ClientUserUpdateBody> = {
    useMutationSearch(): MutationHookResult<{
        q: string;
    }, TSearchUser[]>;
    useUpdateOne(): MutationHookResult<{
        params: {
            id: string;
        };
        body: TUpdateBody;
    }, TUpdateUser>;
    useDeleteOne(): MutationHookResult<{
        id: string;
    }, unknown>;
};
export type ClientFunctionConfig<TCurrentUser = CurrentUser, TSearchUser = unknown, TFieldRequest extends FieldRequest = FieldRequest, TUpdateUser = TCurrentUser, TUpdateBody = ClientUserUpdateBody> = {
    apiClient: {
        auth: AuthApiClientConfig;
        user: ClientUserApiClientConfig<TCurrentUser, TFieldRequest>;
    };
    query: {
        nextauthVerificationToken: NextauthVerificationTokenQueryConfig;
        user: UserQueryConfig<TSearchUser, TUpdateUser, TUpdateBody>;
    };
};
export type ServerFunctionConfig<TUser = CurrentUser, TFieldRequest extends FieldRequest = FieldRequest> = {
    apiClient: {
        user: ServerUserApiClientConfig<TUser, TFieldRequest>;
    };
};
export type EdgeFunctionConfig<TUser = ContextUser, TFieldRequest extends FieldRequest = FieldRequest> = {
    apiClient: {
        user: EdgeUserApiClientConfig<TUser, TFieldRequest>;
    };
};
export type BackendUserUpdate = Partial<Pick<PackageUser, 'email' | 'emailVerified' | 'imageUrl' | 'isAdmin' | 'name'>>;
export type BackendFunctionConfig = {
    auth: {
        adapter: Adapter;
    };
    user: {
        getOneSafe(id: string, context: Context): Promise<PackageUser | null>;
        getOneByEmailSafe(email: string, context: Context): Promise<PackageUser | null>;
        getOrCreateOne(email: string, context: Context): Promise<PackageUser>;
        updateOne(id: string, data: BackendUserUpdate, context: Context): Promise<PackageUser>;
    };
    nextauthAccount: {
        updateOneSafe(params: Pick<PackageNextauthAccount, 'provider' | 'providerAccountId'>, data: unknown, context: Context): Promise<PackageNextauthAccount | null>;
    };
    nextauthVerificationToken: {
        deleteOneSafe(params: {
            email: string;
            code: string;
        }, context: Context): Promise<PackageNextauthVerificationToken | null>;
    };
    systemRequestCache: {
        createOneSafe(request: unknown, context: Context): Promise<PackageSystemRequestCache | null>;
        getOne(request: unknown, context: Context): Promise<Pick<PackageSystemRequestCache, 'completedAt' | 'response'>>;
        updateOneSafe(id: string, response: unknown, context: Context): Promise<PackageSystemRequestCache | null>;
    };
};
export type ShellNavItem = {
    to: string;
    label: string;
    renderIcon: (className: string) => ReactNode;
    isActive: (pathname: string) => boolean;
};
export type ClientComponentConfig = {
    NavContent: () => {
        navItems: ShellNavItem[];
    };
    LandingPage?: ComponentType;
    SettingsContent?: ComponentType<{
        userId: string;
    }>;
};
export type ServerComponentConfig = {
    AdminApiPage: ComponentType;
};
