import { bootstrapPublicConfig } from '@airdev/next/bootstrap/project';
import type { PublicConfig } from './types';

export let publicConfigAdapter: PublicConfig = bootstrapPublicConfig;

export function setPublicConfigAdapter(config: PublicConfig): void {
  publicConfigAdapter = config;
}
