/* "@airdev/next": "managed" */

import {
  CurrentUser,
  CurrentUserFieldRequest,
} from '@/airdev/common/types/context';
import UserServerApiClient from '@/generated/server-clients/user';

export const currentUserServerQueryOptions = {
  queryKey: ['currentUser'],
  queryFn: () =>
    UserServerApiClient.getOneSafe({ id: 'me' }, CurrentUserFieldRequest).then(
      (page: { user: CurrentUser | null }) => page.user
    ),
};
