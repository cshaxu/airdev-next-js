import type { NextauthAdapter } from '@airdev/next/adapter/backend/nextauth';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SESSION_MAX_AGE,
} from '@/backend/config';
import { adapter as nextAuthAdapter } from '@/backend/lib/nextauth/adapter';

export const airdevNextauthAdapter: NextauthAdapter = {
  sessionMaxAge: NEXTAUTH_SESSION_MAX_AGE,
  signInPath: '/auth/signin',
  errorPath: '/auth/error',
  nextAuthAdapter,
  google: {
    allowDangerousEmailAccountLinking: true,
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
  },
};
