import { publicConfig } from '@/common/config';
import type { PublicConfig } from './types';

export let publicConfigAdapter: PublicConfig = publicConfig;

export function setPublicConfigAdapter(config: PublicConfig): void {
  publicConfigAdapter = config;
}
