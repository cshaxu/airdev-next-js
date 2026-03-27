/* "@airdev/next": "managed" */

import {
  CurrentUser,
  CurrentUserFieldRequest,
} from '@/airdev/common/types/context';
import { serverFunctionConfig } from '@/config/function/server';

export const currentUserServerQueryOptions = {
  queryKey: ['currentUser'],
  queryFn: () =>
    serverFunctionConfig.apiClient.user
      .getOneSafe({ id: 'me' }, CurrentUserFieldRequest)
      .then((page: { user: CurrentUser | null }) => page.user),
};
