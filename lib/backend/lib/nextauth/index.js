import { backendFunctionConfig } from '@/config/function/backend';
import { privateConfig } from '@/config/json/private';
import { callbacks } from './callbacks.js';
import { cookies } from './cookies.js';
import { jwt } from './jwt.js';
import { pages } from './pages.js';
import { providers } from './providers.js';
export const authOptions = {
    cookies,
    pages,
    session: { maxAge: privateConfig.nextauth.sessionMaxAge },
    adapter: backendFunctionConfig.auth.adapter,
    providers,
    callbacks,
    jwt,
};
//# sourceMappingURL=index.js.map