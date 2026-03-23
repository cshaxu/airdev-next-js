import { bootstrapNextauthAdapter } from '@airdev/next/bootstrap/backend/nextauth';
import type { NextauthAdapter } from './types';

export let nextauthAdapter: NextauthAdapter = bootstrapNextauthAdapter;

export function setNextauthAdapter(adapter: NextauthAdapter): void {
  nextauthAdapter = adapter;
}
