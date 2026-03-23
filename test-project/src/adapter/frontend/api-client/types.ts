import { CurrentUser } from '@/common/types/context';

export type ApiClientAdapter = {
  becomeUser: (userId: string | null) => Promise<void>;
  getNullableCurrentUser: () => Promise<CurrentUser | null>;
};
