"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializePermission = initializePermission;
const nextauth_1 = require("@airdev/next/adapter/backend/nextauth");
const user_server_1 = require("@airdev/next/frontend/hooks/data/user-server");
const headers_1 = require("next/headers");
const navigation_1 = require("next/navigation");
async function initializePermission(queryClient) {
    const currentUser = await queryClient.fetchQuery(user_server_1.currentUserServerQueryOptions);
    const headersList = await (0, headers_1.headers)();
    const pathname = headersList.get('x-url') || '';
    if (!currentUser?.id) {
        return (0, navigation_1.redirect)(`${nextauth_1.nextauthAdapter.signInPath}?next=${encodeURIComponent(pathname)}`);
    }
    return { currentUser };
}
//# sourceMappingURL=initializePermission.js.map