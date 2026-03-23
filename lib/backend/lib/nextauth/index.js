"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authOptions = void 0;
const nextauth_1 = require("@airdev/next/adapter/backend/nextauth");
const callbacks_1 = require("./callbacks");
const cookies_1 = require("./cookies");
const jwt_1 = require("./jwt");
const pages_1 = require("./pages");
const providers_1 = require("./providers");
exports.authOptions = {
    cookies: cookies_1.cookies,
    pages: pages_1.pages,
    session: {
        maxAge: nextauth_1.nextauthAdapter.sessionMaxAge,
    },
    providers: (0, providers_1.getProviders)(),
    callbacks: callbacks_1.callbacks,
    jwt: jwt_1.jwt,
};
Object.defineProperty(exports.authOptions, 'adapter', {
    configurable: true,
    enumerable: true,
    get() {
        return (nextauth_1.nextauthAdapter.getNextAuthAdapter?.() ?? nextauth_1.nextauthAdapter.nextAuthAdapter);
    },
});
Object.defineProperty(exports.authOptions, 'providers', {
    configurable: true,
    enumerable: true,
    get() {
        return (0, providers_1.getProviders)();
    },
});
//# sourceMappingURL=index.js.map