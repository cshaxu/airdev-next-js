import type { CurrentUser } from '@airdev/next/common/types/context';

export interface ServerApiClientAdapter {
  fetchCurrentUser: () => Promise<CurrentUser | null>;
}
