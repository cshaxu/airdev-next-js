import { CurrentUserFieldRequest } from '@/common/types/context';
import UserServerApiClient from '@/generated/server-clients/user';

export const fetchCurrentUser = () =>
  UserServerApiClient.getOneSafe({ id: 'me' }, CurrentUserFieldRequest).then(
    (page) => page.user
  );
