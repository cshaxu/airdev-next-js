import { Provider } from 'next-auth/providers/index';
import { codeProvider } from './code';
import { googleProvider } from './google';

export const providers: Provider[] = [googleProvider, codeProvider];
