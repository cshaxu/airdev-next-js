import { bootstrapClientQueryAdapter } from '@airdev/next/bootstrap/frontend/query';
import type { ClientQueryAdapter } from './types';

export let clientQueryAdapter: ClientQueryAdapter = bootstrapClientQueryAdapter;

export function setClientQueryAdapter(adapter: ClientQueryAdapter): void {
  clientQueryAdapter = adapter;
}
