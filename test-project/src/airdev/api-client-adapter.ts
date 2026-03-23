import { CurrentUserFieldRequest } from '@/common/types/context';
import { becomeUser } from '@/frontend/sdks/auth-client';
import UserApiClient from '@/generated/clients/user';
import type { ApiClientAdapter } from '@airdev/next/adapter/frontend/api-client';

export const airdevApiClientAdapter: ApiClientAdapter = {
  becomeUser: (userId) => becomeUser(userId).then(() => undefined),
  getNullableCurrentUser: () =>
    UserApiClient.getOneSafe({ id: 'me' }, CurrentUserFieldRequest).then(
      (page) => page.user
    ),
};
