import { ContextUser } from '@/framework/context';

export type PackageNextauthAccount = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
};

export type PackageSystemRequestCache = {
  id: string;
  createdAt: Date;
  completedAt: Date | null;
  request: any;
  response: any;
};

export type PackageUser = ContextUser & {
  emailVerified: Date | null;
  imageUrl: string | null;
};

export type PackageNextauthVerificationTokenParams = {
  email: string;
  code: string;
};

export type PackageNextauthVerificationToken = {
  identifier: string;
  expires: Date;
};
