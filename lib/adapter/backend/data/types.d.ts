import type { Context } from '@airdev/next/framework/context';
import type { Awaitable } from 'airent';
import { ProviderType } from 'next-auth/providers/index';
/** database */
export type DatabaseUser = {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    email: string;
    emailVerified: Date | null;
    imageUrl: string | null;
    isAdmin: boolean;
};
export type DatabaseNextauthAccount = {
    id: string;
    userId: string;
    type: ProviderType;
    provider: string;
    providerAccountId: string;
    refresh_token: string | null;
    access_token: string | null;
    expires_at: number | null;
    token_type: string | null;
    scope: string | null;
    id_token: string | null;
    session_state: string | null;
};
export type DatabaseNextauthSession = {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
};
export type DatabaseNextauthVerificationToken = {
    identifier: string;
    token: string;
    expires: Date;
};
export type DatabaseRequestCache = {
    id: string;
    createdAt: Date;
    completedAt: Date | null;
    request: unknown;
    response: unknown;
};
export type DatabaseRequestCacheBody = unknown;
/** request body */
export type GetOneUserParams = {
    id: string;
};
export type CreateOneUserBody = {
    email: string;
    name?: string;
    emailVerified?: Date | null;
    imageUrl?: string | null;
    isAdmin?: boolean;
};
export type UpdateOneUserBody = {
    email?: string;
    emailVerified?: Date | null;
    imageUrl?: string | null;
    isAdmin?: boolean;
    name?: string;
};
export type GetOneNextauthAccountParams = Pick<DatabaseNextauthAccount, 'provider' | 'providerAccountId'>;
export type UpdateOneNextauthAccountBody = Omit<DatabaseNextauthAccount, 'id'>;
export type CreateOneNextauthSessionBody = Pick<DatabaseNextauthSession, 'expires' | 'sessionToken' | 'userId'>;
export type GetOneNextauthVerificationTokenParams = {
    email: string;
    code: string;
};
/** adapter */
export type DatabaseAdapter = {
    getOneUserSafe: (params: GetOneUserParams, context: Context) => Awaitable<DatabaseUser | null>;
    createOneUser: (body: CreateOneUserBody, context: Context) => Awaitable<DatabaseUser>;
    updateOneUser: (one: DatabaseUser, body: UpdateOneUserBody, context: Context) => Awaitable<DatabaseUser>;
    getOneNextauthAccountSafe: (params: GetOneNextauthAccountParams, context: Context) => Awaitable<DatabaseNextauthAccount | null>;
    updateOneNextauthAccount: (one: DatabaseNextauthAccount, body: UpdateOneNextauthAccountBody, context: Context) => Awaitable<DatabaseNextauthAccount>;
    createOneNextauthSession: (body: CreateOneNextauthSessionBody, context: Context) => Awaitable<DatabaseNextauthSession>;
    deleteOneNextauthVerificationTokenSafe: (params: GetOneNextauthVerificationTokenParams, context: Context) => Awaitable<DatabaseNextauthVerificationToken | null>;
    getOneRequestCache: (body: DatabaseRequestCacheBody, context: Context) => Awaitable<DatabaseRequestCache>;
    createOneRequestCacheSafe: (body: DatabaseRequestCacheBody, context: Context) => Awaitable<DatabaseRequestCache | null>;
    updateOneRequestCacheSafe: (requestCache: DatabaseRequestCache, response: unknown, context: Context) => Awaitable<void>;
};
//# sourceMappingURL=types.d.ts.map