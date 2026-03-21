import { bootstrapNextauthAdapter } from '@/bootstrap/backend/nextauth';
import type { NextauthAdapter } from './types';

export let nextauthAdapter: NextauthAdapter = bootstrapNextauthAdapter;

export function setNextauthAdapter(adapter: NextauthAdapter): void {
  nextauthAdapter = adapter;
}
