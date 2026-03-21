import { databaseAdapter, type DatabaseUser } from '@/adapter/backend/data';
import { mockContext } from '@/backend/lib/framework';
import { pick } from 'lodash-es';
import CredentialsProvider from 'next-auth/providers/credentials';

// Note:
// Official Guide: https://next-auth.js.org/configuration/providers/credentials
// Workaround to overcome the tech-religious limitation imposed by NextAuth team:
// https://github.com/nextauthjs/next-auth/discussions/4394
// https://nneko.branche.online/next-auth-credentials-provider-with-the-database-session-strategy/
// We DID NOT follow the official guide or the outdated workaround.
// See callbacks.ts and jwt.ts for our approach.
export const codeProvider = CredentialsProvider({
  name: 'Code',
  credentials: {
    email: { label: 'Email', type: 'text', placeholder: 'your@email.com' },
    code: { label: 'Code', type: 'text', placeholder: '12345' },
  },
  async authorize(
    credentials: Record<string | number | symbol, string> | undefined
  ) {
    if (credentials === undefined) {
      return null;
    }
    const context = await mockContext();
    const nextauthVerificationToken =
      await databaseAdapter.deleteOneNextauthVerificationTokenSafe(
        { code: credentials.code, email: credentials.email },
        context
      );
    if (nextauthVerificationToken === null) {
      return null;
    }
    const { identifier: email } = nextauthVerificationToken;
    const existingUser = await databaseAdapter.getOneUserSafe(
      { id: email },
      context
    );
    const user =
      existingUser ?? (await databaseAdapter.createOneUser({ email }, context));
    const verifiedUser = await databaseAdapter.updateOneUser(
      user,
      { emailVerified: context.time },
      context
    );
    return buildAdapterUser(verifiedUser, 'email');
  },
});

const buildAdapterUser = (user: DatabaseUser, source: 'google' | 'email') => ({
  source,
  image: user.imageUrl,
  ...pick(user, ['id', 'email', 'emailVerified', 'name', 'imageUrl']),
});
