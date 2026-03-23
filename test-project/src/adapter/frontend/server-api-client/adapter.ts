import { fetchCurrentUser } from '@/frontend/sdks/auth-server';
import type { ServerApiClientAdapter } from './types';

export let serverApiClientAdapter: ServerApiClientAdapter = {
  fetchCurrentUser,
};

export function setServerApiClientAdapter(
  adapter: ServerApiClientAdapter
): void {
  serverApiClientAdapter = adapter;
}
