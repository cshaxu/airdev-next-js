import { NextauthAccountEntity } from '@/backend/entities/nextauth-account';
import { NextauthSessionEntity } from '@/backend/entities/nextauth-session';
import { NextauthVerificationTokenEntity } from '@/backend/entities/nextauth-verification-token';
import { UserEntity } from '@/backend/entities/user';
import { mockContext } from '@/backend/lib/framework';
import { buildInvalidErrorMessage, purify } from '@airent/api';
import createHttpError from 'http-errors';
import {
  Adapter,
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from 'next-auth/adapters';

const buildAccountWhere = (provider: string, providerAccountId: string) => ({
  provider,
  providerAccountId,
});

export const adapter: Adapter = {
  createUser: (_data: any) => {
    throw createHttpError.NotImplemented(
      buildInvalidErrorMessage(
        'createUser',
        'never allow user create through NextAuth'
      )
    );
  },
  getUser: async (id: string) => {
    const context = await mockContext();
    const user = await UserEntity.findUnique({ where: { id } }, context);
    return (user as AdapterUser) ?? null;
  },
  getUserByEmail: async (email: string) => {
    const context = await mockContext();
    const user = await UserEntity.findUnique({ where: { email } }, context);
    return (user as AdapterUser) ?? null;
  },
  getUserByAccount: async ({
    provider,
    providerAccountId,
  }: Pick<AdapterAccount, 'provider' | 'providerAccountId'>) => {
    const context = await mockContext();
    const account = await NextauthAccountEntity.findFirst(
      { where: buildAccountWhere(provider, providerAccountId) },
      context
    );
    if (account === null) {
      return null;
    }
    const user = await UserEntity.findUnique(
      { where: { id: account.userId } },
      context
    );
    return (user as AdapterUser) ?? null;
  },
  updateUser: (_data: any) => {
    throw createHttpError.NotImplemented(
      buildInvalidErrorMessage(
        'createUser',
        'never allow user update through NextAuth'
      )
    );
  },
  deleteUser: (_id: string) => {
    throw createHttpError.NotImplemented(
      buildInvalidErrorMessage(
        'deleteUser',
        'never allow user delete through NextAuth'
      )
    );
  },
  linkAccount: async (data: AdapterAccount) => {
    const context = await mockContext();
    return (await NextauthAccountEntity.create(
      {
        data: {
          id: crypto.randomUUID(),
          userId: data.userId,
          type: data.type,
          provider: data.provider,
          providerAccountId: data.providerAccountId,
          refresh_token: data.refresh_token ?? null,
          access_token: data.access_token ?? null,
          expires_at: data.expires_at ?? null,
          token_type: data.token_type ?? null,
          scope: data.scope ?? null,
          id_token: data.id_token ?? null,
          session_state: data.session_state ?? null,
        },
      },
      context
    )) as unknown as AdapterAccount;
  },
  unlinkAccount: async ({
    provider,
    providerAccountId,
  }: Pick<AdapterAccount, 'provider' | 'providerAccountId'>) => {
    const context = await mockContext();
    const account = await NextauthAccountEntity.findFirst(
      { where: buildAccountWhere(provider, providerAccountId) },
      context
    );
    if (account === null) {
      return null;
    }
    return (await account.delete()) as unknown as AdapterAccount;
  },
  getSessionAndUser: async (sessionToken: string) => {
    const context = await mockContext();
    const session = await NextauthSessionEntity.findFirst(
      { where: { sessionToken } },
      context
    );
    if (session === null) {
      return null;
    }
    const user = await UserEntity.findUnique(
      { where: { id: session.userId } },
      context
    );
    if (user === null) {
      return null;
    }
    return {
      user: user as unknown as AdapterUser,
      session: session as unknown as AdapterSession,
    };
  },
  createSession: async (data) => {
    const context = await mockContext();
    return (await NextauthSessionEntity.create(
      {
        data: {
          id: crypto.randomUUID(),
          ...purify(data),
        },
      },
      context
    )) as unknown as AdapterSession;
  },
  updateSession: async (data) => {
    const context = await mockContext();
    const session = await NextauthSessionEntity.findFirst(
      { where: { sessionToken: data.sessionToken } },
      context
    );
    if (session === null) {
      return null;
    }
    session.fromModel(purify(data));
    return (await session.save()) as unknown as AdapterSession;
  },
  deleteSession: async (sessionToken: string) => {
    const context = await mockContext();
    const session = await NextauthSessionEntity.findFirst(
      { where: { sessionToken } },
      context
    );
    if (session === null) {
      return null;
    }
    return (await session.delete()) as unknown as AdapterSession;
  },
  createVerificationToken: async (data: VerificationToken) => {
    const context = await mockContext();
    const verificationToken = await NextauthVerificationTokenEntity.create(
      { data: purify(data) },
      context
    );
    if ('id' in verificationToken && verificationToken.id) {
      delete verificationToken.id;
    }
    return verificationToken;
  },
  useVerificationToken: async (identifier_token) => {
    const context = await mockContext();
    const verificationToken = await NextauthVerificationTokenEntity.findUnique(
      { where: identifier_token },
      context
    );
    if (verificationToken === null) {
      return null;
    }
    const usedToken = await verificationToken.delete();
    if ('id' in usedToken && usedToken.id) {
      delete usedToken.id;
    }
    return usedToken;
  },
  // @ts-expect-error
  getAccount: (providerAccountId: string, provider: string) =>
    mockContext().then(
      (context) =>
        NextauthAccountEntity.findFirst(
          {
            where: { providerAccountId, provider },
          },
          context
        ) as Promise<AdapterAccount | null>
    ),
};
