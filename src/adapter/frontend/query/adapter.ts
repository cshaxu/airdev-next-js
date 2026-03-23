import { defaultClientQueryAdapter } from '@airdev/next/adapter/defaults';
import type { ClientQueryAdapter } from './types';

export let clientQueryAdapter: ClientQueryAdapter = defaultClientQueryAdapter;

export function setClientQueryAdapter(adapter: ClientQueryAdapter): void {
  clientQueryAdapter = adapter;
}
