import type { ServerApiClientAdapter } from '@airdev/next/adapter/frontend/server-api-client';
import { fetchCurrentUser } from '@/frontend/sdks/auth-server';

export const airdevServerApiClientAdapter: ServerApiClientAdapter = {
  fetchCurrentUser,
};
