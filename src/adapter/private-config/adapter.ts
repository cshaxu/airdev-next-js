import { bootstrapPrivateConfig } from '@/bootstrap/project';
import type { PrivateConfig } from './types';

export let privateConfigAdapter: PrivateConfig = bootstrapPrivateConfig;

export function setPrivateConfigAdapter(config: PrivateConfig): void {
  privateConfigAdapter = config;
}
