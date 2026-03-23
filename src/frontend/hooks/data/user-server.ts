import { serverApiClientAdapter } from '@airdev/next/adapter/frontend/server-api-client';

export const currentUserServerQueryOptions = {
  queryKey: ['currentUser'],
  queryFn: serverApiClientAdapter.fetchCurrentUser,
};
