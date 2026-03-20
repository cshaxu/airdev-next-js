import { getNextAuthBackendIntegration } from '@/integration/backend/auth';
import { AuthOptions } from 'next-auth';
import { callbacks } from './callbacks';
import { cookies } from './cookies';
import { jwt } from './jwt';
import { pages } from './pages';
import { providers } from './providers';

const integration = getNextAuthBackendIntegration();

const baseAuthOptions: AuthOptions = {
  cookies,
  pages,
  session: { maxAge: integration.sessionMaxAge },
  adapter: integration.nextAuthAdapter,
  providers,
  callbacks,
  jwt,
};

export const authOptions =
  integration.buildAuthOptions?.(baseAuthOptions) ?? baseAuthOptions;
