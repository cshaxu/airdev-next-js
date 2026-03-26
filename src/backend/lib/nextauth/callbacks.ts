import { mockContext } from '@/backend/utils/context';
import { backendFunctionConfig } from '@/config/function/backend';
import { privateConfig } from '@/config/json/private';
import { publicConfig } from '@/config/json/public';
import { purify } from '@airent/api';
import { addSeconds } from 'date-fns';
import { Account, CallbacksOptions, Profile, User } from 'next-auth';
import { GoogleProfile } from 'next-auth/providers/google';

type SignInParams = {
  account: Account | null;
  user: User;
  profile?: Profile;
  email?: { verificationRequest?: boolean };
};

const signIn = async (params: SignInParams) => {
  const context = await mockContext();
  const {
    account: nextauthAccount,
    user: nextauthUser,
    profile: nextauthProfile,
  } = params;

  // Check if this is being called in the code auth flow.
  // If so, use the next-auth adapter to create a session entry in the database
  // (signIn is called after authorize so we can safely assume the user is valid
  // and already authenticated).
  const isCode = 'source' in nextauthUser && nextauthUser.source === 'email';
  if (isCode) {
    const sessionToken = crypto.randomUUID();
    const expires = addSeconds(
      context.time,
      privateConfig.nextauth.sessionMaxAge
    );

    await backendFunctionConfig.auth.adapter.createSession!({
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

  const existingUser = await backendFunctionConfig.user.getOneByEmailSafe(
    email,
    context
  );

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
    existingUser ??
    (await backendFunctionConfig.user.getOrCreateOne(email, context));
  const data = purify({
    ...(user.emailVerified === null &&
      email_verified && { emailVerified: context.time }),
    ...(name !== undefined &&
      (user.name.trim().length === 0 || user.name === user.email) && { name }),
    ...(user.imageUrl === null && { imageUrl }),
  });
  await backendFunctionConfig.user.updateOne(user.id, data, context);

  // Find and update account
  if (nextauthAccount !== null) {
    await backendFunctionConfig.nextauthAccount.updateOneSafe(
      {
        provider: nextauthAccount.provider,
        providerAccountId: nextauthAccount.providerAccountId,
      },
      nextauthAccount,
      context
    );
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
  if (
    urlOrigin === baseUrl ||
    urlOrigin.endsWith(publicConfig.service.rootDomain)
  ) {
    // Allows callback URLs on the same origin
    return url;
  }
  return baseUrl;
};

export const callbacks: Partial<CallbacksOptions> = { signIn, redirect };
