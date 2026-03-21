import { serverApiClientAdapter } from '@/adapter/frontend/server-api-client';

export const currentUserServerQueryOptions = {
  queryKey: ['currentUser'],
  queryFn: serverApiClientAdapter.fetchCurrentUser,
};
