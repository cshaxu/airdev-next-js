import { logError, normalizeError } from '@/framework/logging';
import type { FrameworkAdapter } from './types';

export let frameworkAdapter: FrameworkAdapter = {
  logError,
  normalizeError,
};

export function setFrameworkAdapter(adapter: FrameworkAdapter): void {
  frameworkAdapter = adapter;
}
