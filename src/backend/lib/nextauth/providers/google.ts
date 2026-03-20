import { getNextAuthBackendIntegration } from '@/integration/backend/auth';
import GoogleProvider from 'next-auth/providers/google';

export function getGoogleProvider() {
  const google = getNextAuthBackendIntegration().google;
  if (!google) {
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
