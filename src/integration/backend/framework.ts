import type { CurrentUser } from '@/common/types/context';
import type { Context, ContextUser } from '@/framework/context';
import type { Awaitable } from 'airent';

export type CurrentUserServerQueryOptions = {
  queryFn: () => Promise<CurrentUser | null>;
  queryKey: readonly unknown[];
};

export type RequestCacheRecord = {
  completedAt: Date | null;
  response: unknown;
};

export interface RequestCacheIntegration {
  createOneSafe: (
    parsed: unknown,
    context: Context
  ) => Awaitable<unknown | null>;
  getOne: (parsed: unknown, context: Context) => Awaitable<RequestCacheRecord>;
  updateOneSafe: (
    requestCache: unknown,
    response: unknown,
    context: Context
  ) => Awaitable<void>;
}

export interface FrameworkIntegration {
  buildProtectedRedirect?: (nextPath: string) => string;
  cronSecret?: string;
  currentUserServerQueryOptions: CurrentUserServerQueryOptions;
  getNullableUserSafe: (id: string) => Awaitable<ContextUser | null>;
  getSessionEmail: () => Awaitable<string | null>;
  headerCurrentUserIdKey: string;
  internalSecret?: string;
  isConfigured?: boolean;
  isServiceLocal: boolean;
  requestCache?: RequestCacheIntegration;
  requestCacheDelaySeconds?: number;
  shouldHonorBecameUser?: (realCurrentUser: ContextUser | null) => boolean;
}

const defaultIntegration: FrameworkIntegration = {
  buildProtectedRedirect: (nextPath) =>
    `/auth/signin?next=${encodeURIComponent(nextPath)}`,
  cronSecret: '',
  currentUserServerQueryOptions: {
    queryKey: ['currentUser'],
    async queryFn() {
      return null;
    },
  },
  async getNullableUserSafe() {
    return null;
  },
  async getSessionEmail() {
    return null;
  },
  headerCurrentUserIdKey: 'X-CURRENT-USER-ID',
  internalSecret: '',
  isConfigured: false,
  isServiceLocal: false,
  requestCache: undefined,
  requestCacheDelaySeconds: 5,
  shouldHonorBecameUser: (realCurrentUser) => !!realCurrentUser?.isAdmin,
};

let frameworkIntegration: FrameworkIntegration | null = null;

export function setFrameworkIntegration(
  integration: FrameworkIntegration
): void {
  frameworkIntegration = integration;
}

export function getFrameworkIntegration(): FrameworkIntegration {
  return frameworkIntegration ?? defaultIntegration;
}

export function hasFrameworkIntegration(): boolean {
  return frameworkIntegration !== null;
}
