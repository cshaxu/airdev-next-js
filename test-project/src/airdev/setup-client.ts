import { setApiClientAdapter } from '@airdev/next/adapter/frontend/api-client';
import { setClientQueryAdapter } from '@airdev/next/adapter/frontend/query';
import { setShellAdapter } from '@airdev/next/adapter/frontend/shell';
import { setPublicConfigAdapter } from '@airdev/next/adapter/public-config';
import { airdevApiClientAdapter } from './api-client-adapter';
import { airdevClientQueryAdapter } from './client-query-adapter';
import { airdevPublicConfig } from './public-config';
import { airdevClientShellAdapter } from './shell-client-adapter';

let initialized = false;

export function initializeAirdevClient(): void {
  if (initialized) {
    return;
  }
  initialized = true;
  setPublicConfigAdapter(airdevPublicConfig);
  setApiClientAdapter(airdevApiClientAdapter);
  setClientQueryAdapter(airdevClientQueryAdapter);
  setShellAdapter(airdevClientShellAdapter);
}

initializeAirdevClient();
