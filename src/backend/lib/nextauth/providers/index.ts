import { Provider } from 'next-auth/providers/index';
import { codeProvider } from './code';
import { getGoogleProvider } from './google';

export const providers: Provider[] = [
  codeProvider,
  ...[getGoogleProvider()].filter(Boolean),
] as Provider[];
