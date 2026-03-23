"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOneNextauthAccountBodyFromAdapterAccount = updateOneNextauthAccountBodyFromAdapterAccount;
const lodash_es_1 = require("lodash-es");
function updateOneNextauthAccountBodyFromAdapterAccount(account) {
    return {
        ...(0, lodash_es_1.pick)(account, [
            'provider',
            'providerAccountId',
            'type',
            'userId',
        ]),
        access_token: account.access_token ?? null,
        expires_at: account.expires_at ?? null,
        id_token: account.id_token ?? null,
        refresh_token: account.refresh_token ?? null,
        scope: account.scope ?? null,
        session_state: typeof account.session_state === 'string' ? account.session_state : null,
        token_type: account.token_type ?? null,
    };
}
//# sourceMappingURL=utils.js.map