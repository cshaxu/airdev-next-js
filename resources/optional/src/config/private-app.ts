/* "@airdev/next": "seeded" */

import { decrypt } from 'databag';
import dns from 'node:dns';
import EncryptedCredentials from '../../credentials.json';
import PrivateConfigJson from '../../private.config.json';
import { publicAppConfig } from './public-app';

// enforce fetch api to prefer ipv4 over ipv6
// so localhost can be resolved correctly
dns.setDefaultResultOrder('ipv4first');

type Environment = 'local' | 'production';

const DATABAG_PASSWORD = process.env.BAREBONE_NEXT_DATABAG_PASSWORD!;
const dataEnvironment = publicAppConfig.service.dataEnvironment as Environment;

const decryptedCredentials = decrypt(EncryptedCredentials, DATABAG_PASSWORD);
const { data: DataCredentials } = decryptedCredentials;
const environmentalDataCredentials = DataCredentials[dataEnvironment];

const { admin } = PrivateConfigJson;

const database = {
  ...PrivateConfigJson.database,
  url: environmentalDataCredentials.databaseUrl,
};

const nextauth = {
  ...PrivateConfigJson.nextauth,
  secret: process.env.NEXTAUTH_SECRET!,
};

const aws = { ...environmentalDataCredentials.aws, ...PrivateConfigJson.aws };

const { google } = decryptedCredentials;

const openai = { ...decryptedCredentials.openai, ...PrivateConfigJson.openai };

const postmark = {
  ...decryptedCredentials.postmark,
  ...PrivateConfigJson.postmark,
};

export const privateAppConfig = {
  admin,
  database,
  nextauth,
  google,
  aws,
  openai,
  postmark,
};
