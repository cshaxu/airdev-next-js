"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwt = void 0;
const api_1 = require("@airent/api");
const http_errors_1 = __importDefault(require("http-errors"));
exports.jwt = {
    encode: async (params) => /* Promise<string> */ {
        // Note: because we use database strategy, this will only be invoked when
        // the user signs in with CredentialsProvider. The session token is created
        // in the database and we hacked params.token.email field to pass the
        // sessionToken here. Caller of this function is here:
        // https://github.com/nextauthjs/next-auth/blob/98fbedcf772bb1d5b989d3182821fa4764bdf746/packages/core/src/lib/actions/callback/index.ts
        const json = JSON.parse(params.token.email);
        params.token.email = json.email;
        return json.sessionToken;
    },
    decode: async (_params) => /* Promise<JWT | null> */ {
        // Note: because we use database strategy for session tokens,
        // this will never be invoked
        throw http_errors_1.default.NotImplemented((0, api_1.buildInvalidErrorMessage)('decode', 'never allow JWT strategy and decoding in NextAuth'));
    },
};
//# sourceMappingURL=jwt.js.map