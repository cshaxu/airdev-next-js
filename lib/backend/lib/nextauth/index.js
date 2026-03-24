import { backendFunctionConfig } from '@/config/function/backend';
import { privateConfig } from '@/config/private';
import { callbacks } from './callbacks';
import { cookies } from './cookies';
import { jwt } from './jwt';
import { pages } from './pages';
import { providers } from './providers';
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