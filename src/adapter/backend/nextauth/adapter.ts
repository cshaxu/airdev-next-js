import { defaultNextauthAdapter } from '@airdev/next/adapter/defaults';
import type { NextauthAdapter } from './types';

export let nextauthAdapter: NextauthAdapter = defaultNextauthAdapter;

export function setNextauthAdapter(adapter: NextauthAdapter): void {
  nextauthAdapter = adapter;
}
