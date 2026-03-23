import { callBackendApi } from '@/frontend/lib/backend';

export const becomeUser = (userId: string | null) =>
  callBackendApi('/api/auth/become', { userId });
