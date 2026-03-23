import { defaultServerApiClientAdapter } from '@airdev/next/adapter/defaults';
import type { ServerApiClientAdapter } from './types';

export let serverApiClientAdapter: ServerApiClientAdapter =
  defaultServerApiClientAdapter;

export function setServerApiClientAdapter(
  adapter: ServerApiClientAdapter
): void {
  serverApiClientAdapter = adapter;
}
