import { bootstrapServerApiClientAdapter } from '@/bootstrap/frontend/api';
import type { ServerApiClientAdapter } from './types';

export let serverApiClientAdapter: ServerApiClientAdapter =
  bootstrapServerApiClientAdapter;

export function setServerApiClientAdapter(
  adapter: ServerApiClientAdapter
): void {
  serverApiClientAdapter = adapter;
}
