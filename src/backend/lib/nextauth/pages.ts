import { nextauthAdapter } from '@airdev/next/adapter/backend/nextauth';
import { PagesOptions } from 'next-auth';

export const pages: Partial<PagesOptions> = {};

Object.defineProperties(pages, {
  signIn: {
    enumerable: true,
    configurable: true,
    get() {
      return nextauthAdapter.signInPath;
    },
  },
  error: {
    enumerable: true,
    configurable: true,
    get() {
      return nextauthAdapter.errorPath;
    },
  },
});
