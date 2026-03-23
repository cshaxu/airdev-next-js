import type { Adapter } from 'next-auth/adapters';

export type GoogleProviderConfig = {
  allowDangerousEmailAccountLinking?: boolean;
  clientId: string;
  clientSecret: string;
};

export interface NextauthAdapter {
  sessionMaxAge: number;
  signInPath: string;
  errorPath: string;
  nextAuthAdapter?: Adapter;
  getNextAuthAdapter?: () => Adapter | undefined;
  google?: GoogleProviderConfig;
}
