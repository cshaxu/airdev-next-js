import { logError, normalizeError } from '@/framework/logging';
import type { FrameworkAdapter } from '@airdev/next/adapter/backend/framework';

export const airdevFrameworkAdapter: FrameworkAdapter = {
  logError,
  normalizeError,
};
