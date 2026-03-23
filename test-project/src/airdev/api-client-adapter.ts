import type { ApiClientAdapter } from '@airdev/next/adapter/frontend/api-client';
import { CurrentUserFieldRequest } from '@/common/types/context';
import UserApiClient from '@/generated/clients/user';
import { becomeUser } from '@/frontend/sdks/auth-client';

export const airdevApiClientAdapter: ApiClientAdapter = {
  becomeUser: (userId) => becomeUser(userId).then(() => undefined),
  getNullableCurrentUser: () =>
    UserApiClient.getOneSafe({ id: 'me' }, CurrentUserFieldRequest).then(
      (page) => page.user
    ),
};
