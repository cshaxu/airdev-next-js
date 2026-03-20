import { mockContext } from '@/backend/lib/framework';
import { SERVICE_ROOT_DOMAIN } from '@/common/config';
import { getNextAuthBackendIntegration } from '@/integration/backend/auth';
import { addSeconds } from 'date-fns';
import { Account, CallbacksOptions, Profile, User } from 'next-auth';
import { AdapterAccount } from 'next-auth/adapters';
import { GoogleProfile } from 'next-auth/providers/google';

type SignInParams = {
  account: Account | null;
  user: User;
  profile?: Profile;
  email?: { verificationRequest?: boolean };
};

const signIn = async (params: SignInParams) => {
  const context = await mockContext();
  const integration = getNextAuthBackendIntegration();
  const {
    account: nextauthAccount,
    user: nextauthUser,
    profile: nextauthProfile,
  } = params;

  // Check if this is being called in the code auth flow.
  // If so, create a session entry through the configured session adapter
  // (signIn is called after authorize so we can safely assume the user is valid
  // and already authenticated).
  const isCode = 'source' in nextauthUser && nextauthUser.source === 'email';
  if (isCode) {
    const sessionToken = crypto.randomUUID();
    const expires = addSeconds(context.time, integration.sessionMaxAge);

    await integration.sessions.create({
      sessionToken,
      userId: nextauthUser.id,
      expires,
    });
    // Hack user.email field to pass sessionToken to jwt.encode
    // because we only have id/name/email fields in the user object there
    nextauthUser.email = JSON.stringify({
      sessionToken,
      email: nextauthUser.email,
    });
    return true;
  }

  const email = nextauthUser.email ?? nextauthProfile?.email;
  if (email === undefined) {
    // Do not proceed if email is not available
    return false;
  }

  if (params.email?.verificationRequest) {
    // Proceed if email verification request is in progress, regardless
    // of user existence
    return true;
  }

  const existingUser = await integration.users.findByEmail(email);

  // Check if this is being called in the Google auth flow.
  // If so, update the user's name and image if they are null.
  // also, update the user's emailVerified if the email is verified by Google.
  const isGoogle =
    nextauthProfile !== undefined &&
    'iss' in nextauthProfile &&
    nextauthProfile.iss === 'https://accounts.google.com';
  if (!isGoogle) {
    // If not Google auth flow, user must exist
    return existingUser !== null;
  }

  const {
    email_verified,
    name,
    picture: imageUrl,
  } = nextauthProfile as GoogleProfile;
  if (!email_verified) {
    // Do not proceed if google account email is not verified
    return false;
  }

  // Automatically create user when signing in with Google
  const user =
    existingUser ?? (await integration.users.findOrCreateByEmail(email));
  const data: Partial<typeof user> & { id: string } = { id: user.id };
  if ((user.emailVerified ?? null) === null && email_verified) {
    data.emailVerified = context.time;
  }
  if ((user.name ?? null) === null && name) {
    data.name = name;
  }
  if ((user.imageUrl ?? null) === null && imageUrl) {
    data.imageUrl = imageUrl;
  }
  if (Object.keys(data).length > 1) {
    await integration.users.update(data);
  }

  // Find and update account
  if (nextauthAccount !== null && integration.accounts.upsert) {
    const account: AdapterAccount = {
      ...nextauthAccount,
      userId: nextauthAccount.userId ?? user.id,
      type: nextauthAccount.type,
      provider: nextauthAccount.provider,
      providerAccountId: nextauthAccount.providerAccountId,
    };
    await integration.accounts.upsert(account);
  }

  return true;
};

type RedirectParams = { url: string; baseUrl: string };

const redirect = async ({ url, baseUrl }: RedirectParams) => {
  if (url.startsWith('/')) {
    // Allows relative callback URLs
    return `${baseUrl}${url}`;
  }
  const urlOrigin = new URL(url).origin;
  if (urlOrigin === baseUrl || urlOrigin.endsWith(SERVICE_ROOT_DOMAIN)) {
    // Allows callback URLs on the same origin
    return url;
  }
  return baseUrl;
};

export const callbacks: Partial<CallbacksOptions> = { signIn, redirect };
