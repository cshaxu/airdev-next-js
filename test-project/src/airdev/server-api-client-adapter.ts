import { fetchCurrentUser } from '@/frontend/sdks/auth-server';
import type { ServerApiClientAdapter } from '@airdev/next/adapter/frontend/server-api-client';

export const airdevServerApiClientAdapter: ServerApiClientAdapter = {
  fetchCurrentUser,
};
