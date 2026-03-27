import type { PrivateConfig as AirdevPrivateConfig } from '@airdev/next/common/types/config';
import { pick } from 'lodash-es';
import { privateAppConfig } from '../private-app';

export const privateConfig: AirdevPrivateConfig = {
  database: pick(privateAppConfig.database, ['batchSize', 'delaySeconds']),
  nextauth: pick(privateAppConfig.nextauth, ['sessionMaxAge']),
  google: privateAppConfig.google,
};
