import { defaultDatabaseAdapter } from '@airdev/next/adapter/defaults';
import type { DatabaseAdapter } from './types';

export let databaseAdapter: DatabaseAdapter = defaultDatabaseAdapter;

export function setDatabaseAdapter(adapter: DatabaseAdapter): void {
  databaseAdapter = adapter;
}
