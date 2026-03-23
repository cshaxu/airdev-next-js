import { nextauthAdapter } from '@airdev/next/adapter/backend/nextauth';
import { AuthOptions } from 'next-auth';
import { callbacks } from './callbacks';
import { cookies } from './cookies';
import { jwt } from './jwt';
import { pages } from './pages';
import { providers } from './providers';

export const authOptions: AuthOptions = {
  cookies,
  pages,
  session: {
    strategy: 'database',
    maxAge: nextauthAdapter.sessionMaxAge,
  },
  providers,
  callbacks,
  jwt,
};

Object.defineProperty(authOptions, 'adapter', {
  configurable: true,
  enumerable: true,
  get() {
    return (
      nextauthAdapter.getNextAuthAdapter?.() ?? nextauthAdapter.nextAuthAdapter
    );
  },
});
