import { NEXTAUTH_SESSION_MAX_AGE } from '@/backend/config';
import { AuthOptions } from 'next-auth';
import { adapter } from './adapter';
import { callbacks } from './callbacks';
import { cookies } from './cookies';
import { jwt } from './jwt';
import { pages } from './pages';
import { providers } from './providers';

export const authOptions: AuthOptions = {
  cookies,
  pages,
  session: { maxAge: NEXTAUTH_SESSION_MAX_AGE },
  adapter,
  providers,
  callbacks,
  jwt,
};
