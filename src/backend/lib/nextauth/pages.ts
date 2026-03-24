import { publicConfig } from '@/config/public';
import { pick } from 'lodash-es';
import { PagesOptions } from 'next-auth';

// Redirect passed in query string as ?next=
// Error code passed in query string as ?error=
export const pages: Partial<PagesOptions> = pick(publicConfig.nextauth, [
  'signIn',
  'error',
]);
