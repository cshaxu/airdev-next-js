import {
  databaseAdapter,
  DatabaseUser,
  updateOneNextauthAccountBodyFromAdapterAccount,
} from '@/adapter/backend/data';
import { nextauthAdapter } from '@/adapter/backend/nextauth';
import { mockContext } from '@/backend/lib/framework';
import { publicConfig } from '@/common/config';
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
  // If so, create a session entry through the configured session adapter
  // (signIn is called after authorize so we can safely assume the user is valid
  // and already authenticated).
  const isCode = 'source' in nextauthUser && nextauthUser.source === 'email';
  if (isCode) {
    const sessionToken = crypto.randomUUID();
    const expires = addSeconds(context.time, nextauthAdapter.sessionMaxAge);

    await databaseAdapter.createOneNextauthSession(
      { expires, sessionToken, userId: nextauthUser.id },
      context
    );
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

  const existingUser = await databaseAdapter.getOneUserSafe(
    { id: email },
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
    existingUser ?? (await databaseAdapter.createOneUser({ email }, context));
  const data: Partial<DatabaseUser> = {};
  if (user.emailVerified === null && email_verified) {
    data.emailVerified = context.time;
  }
  if (!user.name && name) {
    data.name = name;
  }
  if (user.imageUrl === null && imageUrl) {
    data.imageUrl = imageUrl;
  }
  if (Object.keys(data).length > 0) {
    await databaseAdapter.updateOneUser(user, data, context);
  }

  // Find and update account
  if (nextauthAccount !== null) {
    const existingAccount = await databaseAdapter.getOneNextauthAccountSafe(
      {
        provider: nextauthAccount.provider,
        providerAccountId: nextauthAccount.providerAccountId,
      },
      context
    );
    if (existingAccount !== null) {
      const account = updateOneNextauthAccountBodyFromAdapterAccount({
        ...nextauthAccount,
        userId: nextauthAccount.userId ?? user.id,
        type: nextauthAccount.type,
        provider: nextauthAccount.provider,
        providerAccountId: nextauthAccount.providerAccountId,
      });
      await databaseAdapter.updateOneNextauthAccount(
        existingAccount,
        account,
        context
      );
    }
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
