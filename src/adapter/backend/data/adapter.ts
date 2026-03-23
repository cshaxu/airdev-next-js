import { bootstrapDatabaseAdapter } from '@airdev/next/bootstrap/backend/data';
import type { DatabaseAdapter } from './types';

export let databaseAdapter: DatabaseAdapter = bootstrapDatabaseAdapter;

export function setDatabaseAdapter(adapter: DatabaseAdapter): void {
  databaseAdapter = adapter;
}
