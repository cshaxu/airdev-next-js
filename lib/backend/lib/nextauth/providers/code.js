"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeProvider = void 0;
const data_1 = require("@airdev/next/adapter/backend/data");
const framework_1 = require("@airdev/next/backend/lib/framework");
const lodash_es_1 = require("lodash-es");
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
// Note:
// Official Guide: https://next-auth.js.org/configuration/providers/credentials
// Workaround to overcome the tech-religious limitation imposed by NextAuth team:
// https://github.com/nextauthjs/next-auth/discussions/4394
// https://nneko.branche.online/next-auth-credentials-provider-with-the-database-session-strategy/
// We DID NOT follow the official guide or the outdated workaround.
// See callbacks.ts and jwt.ts for our approach.
exports.codeProvider = (0, credentials_1.default)({
    name: 'Code',
    credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'your@email.com' },
        code: { label: 'Code', type: 'text', placeholder: '12345' },
    },
    async authorize(credentials) {
        if (credentials === undefined) {
            return null;
        }
        const context = await (0, framework_1.mockContext)();
        const nextauthVerificationToken = await data_1.databaseAdapter.deleteOneNextauthVerificationTokenSafe({ code: credentials.code, email: credentials.email }, context);
        if (nextauthVerificationToken === null) {
            return null;
        }
        const { identifier: email } = nextauthVerificationToken;
        const existingUser = await data_1.databaseAdapter.getOneUserSafe({ id: email }, context);
        const user = existingUser ?? (await data_1.databaseAdapter.createOneUser({ email }, context));
        const verifiedUser = await data_1.databaseAdapter.updateOneUser(user, { emailVerified: context.time }, context);
        return buildAdapterUser(verifiedUser, 'email');
    },
});
const buildAdapterUser = (user, source) => ({
    source,
    image: user.imageUrl,
    ...(0, lodash_es_1.pick)(user, ['id', 'email', 'emailVerified', 'name', 'imageUrl']),
});
//# sourceMappingURL=code.js.map