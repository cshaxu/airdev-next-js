import { defaultPublicConfig } from '@airdev/next/adapter/defaults';
import type { PublicConfig } from './types';

export let publicConfigAdapter: PublicConfig = defaultPublicConfig;

export function setPublicConfigAdapter(config: PublicConfig): void {
  publicConfigAdapter = config;
}
