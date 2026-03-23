import { nextauthAdapter } from '@/adapter/backend/nextauth';
import { PagesOptions } from 'next-auth';

export const pages: Partial<PagesOptions> = {
  signIn: nextauthAdapter.signInPath,
  error: nextauthAdapter.errorPath, // Error code passed in query string as ?error=
};
