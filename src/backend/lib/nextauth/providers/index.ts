import { Provider } from 'next-auth/providers/index';
import { codeProvider } from './code';
import { getGoogleProvider } from './google';

export function getProviders(): Provider[] {
  return [codeProvider, ...[getGoogleProvider()].filter(Boolean)] as Provider[];
}
