import type { Awaitable } from 'airent';
import type { AuthOptions, User } from 'next-auth';
import type {
  Adapter,
  AdapterAccount,
  AdapterSession,
  VerificationToken,
} from 'next-auth/adapters';

export type AuthAppUser = {
  email?: string | null;
  emailVerified?: Date | null;
  id: string;
  imageUrl?: string | null;
  isAdmin?: boolean;
  name?: string | null;
};

export type GoogleProviderConfig = {
  allowDangerousEmailAccountLinking?: boolean;
  clientId: string;
  clientSecret: string;
};

export interface AuthUserAdapter {
  createFromEmailCode: (email: string, time: Date) => Awaitable<AuthAppUser>;
  findByEmail: (email: string) => Awaitable<AuthAppUser | null>;
  findById: (id: string) => Awaitable<AuthAppUser | null>;
  findOrCreateByEmail: (email: string) => Awaitable<AuthAppUser>;
  update: (
    user: Partial<AuthAppUser> & Pick<AuthAppUser, 'id'>
  ) => Awaitable<AuthAppUser>;
}

export interface AuthAccountAdapter {
  create: (account: AdapterAccount) => Awaitable<AdapterAccount>;
  delete: (provider: string, providerAccountId: string) => Awaitable<void>;
  findUserByAccount: (
    provider: string,
    providerAccountId: string
  ) => Awaitable<AuthAppUser | null>;
  upsert?: (account: AdapterAccount) => Awaitable<AdapterAccount>;
}

export interface AuthSessionAdapter {
  create: (
    session: Partial<AdapterSession> &
      Pick<AdapterSession, 'expires' | 'sessionToken' | 'userId'>
  ) => Awaitable<AdapterSession>;
  delete: (sessionToken: string) => Awaitable<void>;
  getSessionAndUser: (
    sessionToken: string
  ) => Awaitable<{ session: AdapterSession; user: AuthAppUser } | null>;
  update: (
    session: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>
  ) => Awaitable<AdapterSession | null | undefined>;
}

export interface AuthVerificationTokenAdapter {
  create: (token: VerificationToken) => Awaitable<VerificationToken>;
  use: (
    identifier: string,
    token: string
  ) => Awaitable<VerificationToken | null>;
}

export interface NextAuthBackendIntegration {
  accounts: AuthAccountAdapter;
  buildAuthOptions?: (baseOptions: AuthOptions) => AuthOptions;
  google?: GoogleProviderConfig;
  mapAdapterUserToSessionUser?: (user: User) => User;
  mapAuthUserToAdapterUser?: (
    user: AuthAppUser,
    source: 'email' | 'google'
  ) => User;
  nextAuthAdapter?: Adapter;
  sessionMaxAge: number;
  sessions: AuthSessionAdapter;
  users: AuthUserAdapter;
  verificationTokens: AuthVerificationTokenAdapter;
}

const defaultUser: AuthAppUser = {
  id: 'user_1',
  email: 'account@example.com',
  emailVerified: null,
  imageUrl: null,
  isAdmin: true,
  name: 'Airdev User',
};

const defaultIntegration: NextAuthBackendIntegration = {
  accounts: {
    async create(account) {
      return account;
    },
    async delete() {},
    async findUserByAccount() {
      return null;
    },
    async upsert(account) {
      return account;
    },
  },
  google: undefined,
  mapAuthUserToAdapterUser: (user) => ({
    id: user.id,
    email: user.email ?? 'account@example.com',
    emailVerified: user.emailVerified ?? null,
    image: user.imageUrl ?? null,
    name: user.name ?? null,
  }),
  nextAuthAdapter: undefined,
  sessionMaxAge: 30 * 24 * 60 * 60,
  sessions: {
    async create(session) {
      return {
        expires: session.expires,
        sessionToken: session.sessionToken,
        userId: session.userId,
      };
    },
    async delete() {},
    async getSessionAndUser() {
      return null;
    },
    async update(session) {
      return session.userId && session.expires
        ? {
            expires: session.expires,
            sessionToken: session.sessionToken,
            userId: session.userId,
          }
        : null;
    },
  },
  users: {
    async createFromEmailCode() {
      return defaultUser;
    },
    async findByEmail() {
      return null;
    },
    async findById() {
      return defaultUser;
    },
    async findOrCreateByEmail(email) {
      return { ...defaultUser, email, name: email };
    },
    async update(user) {
      return { ...defaultUser, ...user };
    },
  },
  verificationTokens: {
    async create(token) {
      return token;
    },
    async use(identifier, token) {
      return { identifier, token, expires: new Date(0) };
    },
  },
};

let nextAuthBackendIntegration: NextAuthBackendIntegration | null = null;

export function setNextAuthBackendIntegration(
  integration: NextAuthBackendIntegration
): void {
  nextAuthBackendIntegration = integration;
}

export function getNextAuthBackendIntegration(): NextAuthBackendIntegration {
  return nextAuthBackendIntegration ?? defaultIntegration;
}

export function hasNextAuthBackendIntegration(): boolean {
  return nextAuthBackendIntegration !== null;
}
