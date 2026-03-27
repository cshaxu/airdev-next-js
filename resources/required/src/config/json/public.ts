import type { PublicConfig as AirdevPublicConfig } from '@airdev/next/common/types/config';
import { pick } from 'lodash-es';
import { publicAppConfig } from '../public-app';

export const publicConfig: AirdevPublicConfig = {
  ...pick(publicAppConfig, ['app', 'defaults', 'shell', 'posthog']),
  service: pick(publicAppConfig.service, [
    'baseUrl',
    'rootDomain',
    'titlePrefix',
    'serviceEnvironment',
  ]),
};
