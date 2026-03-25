import { serverFunctionConfig } from '@/config/function/server';
import { CurrentUser, CurrentUserFieldRequest } from '@/common/types/context';

export const currentUserServerQueryOptions = {
  queryKey: ['currentUser'],
  queryFn: () =>
    serverFunctionConfig.apiClient.user
      .getOneSafe({ id: 'me' }, CurrentUserFieldRequest)
      .then((page: { user: CurrentUser | null }) => page.user),
};
