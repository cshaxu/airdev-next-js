import { nextauthAdapter } from '@airdev/next/adapter/backend/nextauth';
import { AuthOptions } from 'next-auth';
import { callbacks } from './callbacks';
import { cookies } from './cookies';
import { jwt } from './jwt';
import { pages } from './pages';
import { getProviders } from './providers';

export const authOptions: AuthOptions = {
  cookies,
  pages,
  session: {
    maxAge: nextauthAdapter.sessionMaxAge,
  },
  providers: getProviders(),
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

Object.defineProperty(authOptions, 'providers', {
  configurable: true,
  enumerable: true,
  get() {
    return getProviders();
  },
});
