import { mockContext } from '@/backend/lib/framework';
import {
  getNextAuthBackendIntegration,
  type AuthAppUser,
} from '@/integration/backend/auth';
import type { AdapterUser } from 'next-auth/adapters';
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
    if (credentials === undefined || !credentials.email || !credentials.code) {
      return null;
    }
    const context = await mockContext();
    const integration = getNextAuthBackendIntegration();
    const nextauthVerificationToken = await integration.verificationTokens.use(
      credentials.email,
      credentials.code
    );
    if (nextauthVerificationToken === null) {
      return null;
    }
    const { identifier: email } = nextauthVerificationToken;
    const user = await integration.users.createFromEmailCode(
      email,
      context.time
    );
    return buildAdapterUser(user, 'email');
  },
});

export const buildAdapterUser = (
  user: AuthAppUser,
  source: 'google' | 'email'
): AdapterUser => {
  const integration = getNextAuthBackendIntegration();
  return integration.mapAuthUserToAdapterUser
    ? (integration.mapAuthUserToAdapterUser(user, source) as AdapterUser)
    : ({
        id: user.id,
        email: user.email ?? 'account@example.com',
        emailVerified: user.emailVerified ?? null,
        image: user.imageUrl ?? null,
        name: user.name ?? null,
        source,
      } as AdapterUser);
};
