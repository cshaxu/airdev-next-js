import { nextauthAdapter } from '@/adapter/backend/nextauth';
import { AuthOptions } from 'next-auth';
import { callbacks } from './callbacks';
import { cookies } from './cookies';
import { jwt } from './jwt';
import { pages } from './pages';
import { providers } from './providers';

export const authOptions: AuthOptions = {
  cookies,
  pages,
  session: { maxAge: nextauthAdapter.sessionMaxAge },
  adapter: nextauthAdapter.nextAuthAdapter,
  providers,
  callbacks,
  jwt,
};
