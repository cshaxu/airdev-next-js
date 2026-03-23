import type { PrivateConfig } from '@airdev/next/adapter/private-config';
import { privateConfig } from '@/backend/config';

export const airdevPrivateConfig: PrivateConfig = {
  ...privateConfig,
  cacheRequestPathPrefixes: [...privateConfig.cacheRequestPathPrefixes],
};
