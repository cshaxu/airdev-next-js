import type { NextauthAdapter } from '@airdev/next/adapter/backend/nextauth';

export const bootstrapNextauthAdapter: NextauthAdapter = {
  errorPath: '/auth/error',
  google: undefined,
  nextAuthAdapter: undefined,
  sessionMaxAge: 30 * 24 * 60 * 60,
  signInPath: '/auth/signin',
};
