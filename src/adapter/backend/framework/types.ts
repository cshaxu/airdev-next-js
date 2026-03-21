import type * as AirentApi from '@airent/api';

export interface FrameworkAdapter {
  logError: (error: any, context?: Record<string, any>) => void;
  normalizeError: (error: any) => AirentApi.NormalizedError;
}
