/* "@airdev/next": "managed" */

import type { AirdevPrivateConfigBase } from '@/airdev/common/types/config';
import { privateAppConfig } from '@/config/private';
import { pick } from 'lodash-es';

export const airdevPrivateConfig: AirdevPrivateConfigBase = {
  ...pick(privateAppConfig, ['admin', 'aws', 'google', 'postmark']),
  database: pick(privateAppConfig.database, [
    'batchSize',
    'delaySeconds',
    'url',
  ]),
  nextauth: pick(privateAppConfig.nextauth, ['secret', 'sessionMaxAge']),
};
