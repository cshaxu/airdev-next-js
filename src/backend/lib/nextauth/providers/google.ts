import { privateConfig } from '@/config/json/private';
import GoogleProvider from 'next-auth/providers/google';

export const googleProvider = GoogleProvider({
  clientId: privateConfig.google.clientId,
  clientSecret: privateConfig.google.clientSecret,
  allowDangerousEmailAccountLinking: true,
  authorization: { params: { include_granted_scopes: true } },
});
