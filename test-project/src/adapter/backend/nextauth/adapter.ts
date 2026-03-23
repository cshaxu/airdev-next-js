import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SESSION_MAX_AGE,
} from '@/backend/config';
import { adapter } from '@/backend/lib/nextauth/adapter';
import type { NextauthAdapter } from './types';

export let nextauthAdapter: NextauthAdapter = {
  sessionMaxAge: NEXTAUTH_SESSION_MAX_AGE,
  signInPath: '/auth/signin',
  errorPath: '/auth/error',
  nextAuthAdapter: adapter,
  google: {
    allowDangerousEmailAccountLinking: true,
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
  },
};

export function setNextauthAdapter(adapter: NextauthAdapter): void {
  nextauthAdapter = adapter;
}
