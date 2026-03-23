import { defaultFrameworkAdapter } from '@airdev/next/adapter/defaults';
import type { FrameworkAdapter } from './types';

export let frameworkAdapter: FrameworkAdapter = defaultFrameworkAdapter;

export function setFrameworkAdapter(adapter: FrameworkAdapter): void {
  frameworkAdapter = adapter;
}
