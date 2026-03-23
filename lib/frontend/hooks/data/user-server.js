"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserServerQueryOptions = void 0;
const server_api_client_1 = require("@airdev/next/adapter/frontend/server-api-client");
exports.currentUserServerQueryOptions = {
    queryKey: ['currentUser'],
    queryFn: () => server_api_client_1.serverApiClientAdapter.fetchCurrentUser(),
};
//# sourceMappingURL=user-server.js.map