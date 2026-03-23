"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGoogleProvider = getGoogleProvider;
const nextauth_1 = require("@airdev/next/adapter/backend/nextauth");
const google_1 = __importDefault(require("next-auth/providers/google"));
function getGoogleProvider() {
    const google = nextauth_1.nextauthAdapter.google;
    if (google === undefined) {
        return null;
    }
    return (0, google_1.default)({
        allowDangerousEmailAccountLinking: google.allowDangerousEmailAccountLinking ?? true,
        authorization: { params: { include_granted_scopes: true } },
        clientId: google.clientId,
        clientSecret: google.clientSecret,
    });
}
//# sourceMappingURL=google.js.map