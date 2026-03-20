import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '@/backend/config';
import GoogleProvider from 'next-auth/providers/google';

export const googleProvider = GoogleProvider({
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  allowDangerousEmailAccountLinking: true,
  authorization: { params: { include_granted_scopes: true } },
});
