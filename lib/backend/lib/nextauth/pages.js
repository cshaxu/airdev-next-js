import { publicConfig } from '@/config/public';
import { pick } from 'lodash-es';
// Redirect passed in query string as ?next=
// Error code passed in query string as ?error=
export const pages = pick(publicConfig.nextauth, [
    'signIn',
    'error',
]);
//# sourceMappingURL=pages.js.map