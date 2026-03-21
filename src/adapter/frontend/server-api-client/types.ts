import type { CurrentUser } from '@/common/types/context';

export interface ServerApiClientAdapter {
  fetchCurrentUser: () => Promise<CurrentUser | null>;
}
