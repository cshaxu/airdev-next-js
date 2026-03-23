"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pages = void 0;
const nextauth_1 = require("@airdev/next/adapter/backend/nextauth");
exports.pages = {};
Object.defineProperties(exports.pages, {
    signIn: {
        enumerable: true,
        configurable: true,
        get() {
            return nextauth_1.nextauthAdapter.signInPath;
        },
    },
    error: {
        enumerable: true,
        configurable: true,
        get() {
            return nextauth_1.nextauthAdapter.errorPath;
        },
    },
});
//# sourceMappingURL=pages.js.map