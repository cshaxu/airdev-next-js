import { defaultPrivateConfig } from '@airdev/next/adapter/defaults';
import type { PrivateConfig } from './types';

export let privateConfigAdapter: PrivateConfig = defaultPrivateConfig;

export function setPrivateConfigAdapter(config: PrivateConfig): void {
  privateConfigAdapter = config;
}
