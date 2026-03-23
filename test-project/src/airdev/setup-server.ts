import { setDatabaseAdapter } from '@airdev/next/adapter/backend/data';
import { setFrameworkAdapter } from '@airdev/next/adapter/backend/framework';
import { setNextauthAdapter } from '@airdev/next/adapter/backend/nextauth';
import { setServerApiClientAdapter } from '@airdev/next/adapter/frontend/server-api-client';
import { setShellAdapter } from '@airdev/next/adapter/frontend/shell';
import { setPrivateConfigAdapter } from '@airdev/next/adapter/private-config';
import { setPublicConfigAdapter } from '@airdev/next/adapter/public-config';
import { airdevDatabaseAdapter } from './database-adapter';
import { airdevFrameworkAdapter } from './framework-adapter';
import { airdevNextauthAdapter } from './nextauth-adapter';
import { airdevPrivateConfig } from './private-config';
import { airdevPublicConfig } from './public-config';
import { airdevServerApiClientAdapter } from './server-api-client-adapter';
import { airdevServerShellAdapter } from './shell-server-adapter';

let initialized = false;

export function initializeAirdevServer(): void {
  if (initialized) {
    return;
  }
  initialized = true;
  setPublicConfigAdapter(airdevPublicConfig);
  setShellAdapter(airdevServerShellAdapter);
  setPrivateConfigAdapter(airdevPrivateConfig);
  setServerApiClientAdapter(airdevServerApiClientAdapter);
  setDatabaseAdapter(airdevDatabaseAdapter);
  setFrameworkAdapter(airdevFrameworkAdapter);
  setNextauthAdapter(airdevNextauthAdapter);
}

initializeAirdevServer();
