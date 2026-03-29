/* "@airdev/next": "seeded" */

// Note: anything added here will be leaked to the public, use caution!

import {
  AirdevPublicConfigBase,
  EnvironmentBase,
} from '@/airdev/common/types/config';
import PublicConfigJson from '../../public.config.json';

// environment definitions, do not move

const SERVICE_ENVIRONMENT = process.env
  .NEXT_PUBLIC_BAREBONE_NEXT_SERVICE_ENVIRONMENT as EnvironmentBase;
const DATA_ENVIRONMENT = process.env
  .NEXT_PUBLIC_BAREBONE_NEXT_DATA_ENVIRONMENT as EnvironmentBase;

// config loader, do not move

const { data: publicDataConfig, service: publicServiceConfig } =
  PublicConfigJson;
const publicEnvironmentalServiceConfig =
  publicServiceConfig[SERVICE_ENVIRONMENT];
const publicEnvironmentalDataConfig = publicDataConfig[DATA_ENVIRONMENT];

const serviceBaseUrl =
  SERVICE_ENVIRONMENT === 'local' && process.env.NEXT_PUBLIC_LOCAL_HTTPS
    ? publicEnvironmentalServiceConfig.baseUrl.replace('http:', 'https:')
    : publicEnvironmentalServiceConfig.baseUrl;

const service = {
  baseUrl: serviceBaseUrl,
  rootDomain: publicEnvironmentalServiceConfig.rootDomain,
  titlePrefix: publicEnvironmentalServiceConfig.titlePrefix,
  name: publicEnvironmentalServiceConfig.name,
  protocol: publicEnvironmentalServiceConfig.protocol,
  apiClientBaseUrl: typeof window === 'undefined' ? serviceBaseUrl : '',
  dataEnvironment: DATA_ENVIRONMENT,
  serviceEnvironment: SERVICE_ENVIRONMENT,
};

const { app, defaults, google, posthog } = PublicConfigJson;
const shell = PublicConfigJson.shell as AirdevPublicConfigBase['shell'];

const aws = {
  ...PublicConfigJson.aws,
  s3Bucket: publicEnvironmentalDataConfig.aws.s3Bucket,
};

export const baseUrl = `${service.apiClientBaseUrl}/api/data`;

export const publicAppConfig = {
  app,
  defaults,
  shell,
  service,
  aws,
  google,
  posthog,
};
