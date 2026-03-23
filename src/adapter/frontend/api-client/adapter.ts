import { defaultApiClientAdapter } from '@airdev/next/adapter/defaults';
import type { ApiClientAdapter } from './types';

export let apiClientAdapter: ApiClientAdapter = defaultApiClientAdapter;

export function setApiClientAdapter(adapter: ApiClientAdapter): void {
  apiClientAdapter = adapter;
}
