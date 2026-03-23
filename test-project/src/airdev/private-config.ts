import { privateConfig } from '@/backend/config';
import type { PrivateConfig } from '@airdev/next/adapter/private-config';

export const airdevPrivateConfig: PrivateConfig = {
  ...privateConfig,
  cacheRequestPathPrefixes: [...privateConfig.cacheRequestPathPrefixes],
};
