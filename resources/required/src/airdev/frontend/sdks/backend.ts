/* "@airdev/next": "managed" */

import { callBackendApi } from '@/airdev/frontend/lib/backend';

export const become = (userId: string | null) =>
  callBackendApi('/api/auth/become', { userId });
