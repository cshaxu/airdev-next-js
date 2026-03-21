import { bootstrapClientApiClientAdapter } from '@/bootstrap/frontend/api';
import type { ApiClientAdapter } from './types';

export let apiClientAdapter: ApiClientAdapter = bootstrapClientApiClientAdapter;

export function setApiClientAdapter(adapter: ApiClientAdapter): void {
  apiClientAdapter = adapter;
}
