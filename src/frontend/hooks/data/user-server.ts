import { fetchCurrentUser } from '@/frontend/sdks/auth-server';

export const currentUserServerQueryOptions = {
  queryKey: ['currentUser'],
  queryFn: fetchCurrentUser,
};
