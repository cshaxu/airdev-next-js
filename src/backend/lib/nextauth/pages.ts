import { PagesOptions } from 'next-auth';

export const pages: Partial<PagesOptions> = {
  signIn: '/auth/signin',
  error: '/auth/error', // Error code passed in query string as ?error=
};
