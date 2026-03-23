import { nextauthAdapter } from '@/adapter/backend/nextauth';
import GoogleProvider from 'next-auth/providers/google';

export function getGoogleProvider() {
  const google = nextauthAdapter.google;
  if (google === undefined) {
    return null;
  }
  return GoogleProvider({
    allowDangerousEmailAccountLinking:
      google.allowDangerousEmailAccountLinking ?? true,
    authorization: { params: { include_granted_scopes: true } },
    clientId: google.clientId,
    clientSecret: google.clientSecret,
  });
}
