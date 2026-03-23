import type { FrameworkAdapter } from '@airdev/next/adapter/backend/framework';
import { logError, normalizeError } from '@/framework/logging';

export const airdevFrameworkAdapter: FrameworkAdapter = {
  logError,
  normalizeError,
};
