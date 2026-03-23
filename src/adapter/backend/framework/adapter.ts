import { bootstrapFrameworkAdapter } from '@airdev/next/bootstrap/backend/framework';
import type { FrameworkAdapter } from './types';

export let frameworkAdapter: FrameworkAdapter = bootstrapFrameworkAdapter;

export function setFrameworkAdapter(adapter: FrameworkAdapter): void {
  frameworkAdapter = adapter;
}
