import { CurrentUserFieldRequest } from '@/common/types/context';
import UserApiClient from '@/generated/clients/user';
import { becomeUser } from '@/frontend/sdks/auth-client';
import type { ApiClientAdapter } from './types';

const defaultApiClientAdapter: ApiClientAdapter = {
  becomeUser: (userId) => becomeUser(userId).then(() => undefined),
  getNullableCurrentUser: () =>
    UserApiClient.getOneSafe({ id: 'me' }, CurrentUserFieldRequest).then(
      (page) => page.user
    ),
};

export let apiClientAdapter: ApiClientAdapter = defaultApiClientAdapter;

export function setApiClientAdapter(adapter: ApiClientAdapter): void {
  apiClientAdapter = adapter;
}
