import type { PrivateConfig } from './types';
import { privateConfig } from '@/backend/config';

export let privateConfigAdapter: PrivateConfig = {
  ...privateConfig,
  cacheRequestPathPrefixes: [...privateConfig.cacheRequestPathPrefixes],
};

export function setPrivateConfigAdapter(config: PrivateConfig): void {
  privateConfigAdapter = config;
}
