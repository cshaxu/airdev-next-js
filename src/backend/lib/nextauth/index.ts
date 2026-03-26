import { backendFunctionConfig } from '@/config/function/backend';
import { privateConfig } from '@/config/json/private';
import { AuthOptions } from 'next-auth';
import { callbacks } from './callbacks';
import { cookies } from './cookies';
import { jwt } from './jwt';
import { pages } from './pages';
import { providers } from './providers';

export const authOptions: AuthOptions = {
  cookies,
  pages,
  session: { maxAge: privateConfig.nextauth.sessionMaxAge },
  adapter: backendFunctionConfig.auth.adapter,
  providers,
  callbacks,
  jwt,
};
