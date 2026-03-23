"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callbacks = void 0;
const data_1 = require("@airdev/next/adapter/backend/data");
const nextauth_1 = require("@airdev/next/adapter/backend/nextauth");
const framework_1 = require("@airdev/next/backend/lib/framework");
const config_1 = require("@airdev/next/common/config");
const date_fns_1 = require("date-fns");
const signIn = async (params) => {
    const context = await (0, framework_1.mockContext)();
    const { account: nextauthAccount, user: nextauthUser, profile: nextauthProfile, } = params;
    // Check if this is being called in the code auth flow.
    // If so, create a session entry through the configured session adapter
    // (signIn is called after authorize so we can safely assume the user is valid
    // and already authenticated).
    const isCode = 'source' in nextauthUser && nextauthUser.source === 'email';
    if (isCode) {
        const sessionToken = crypto.randomUUID();
        const expires = (0, date_fns_1.addSeconds)(context.time, nextauth_1.nextauthAdapter.sessionMaxAge);
        await data_1.databaseAdapter.createOneNextauthSession({ expires, sessionToken, userId: nextauthUser.id }, context);
        // Hack user.email field to pass sessionToken to jwt.encode
        // because we only have id/name/email fields in the user object there
        nextauthUser.email = JSON.stringify({
            sessionToken,
            email: nextauthUser.email,
        });
        return true;
    }
    const email = nextauthUser.email ?? nextauthProfile?.email;
    if (email === undefined) {
        // Do not proceed if email is not available
        return false;
    }
    if (params.email?.verificationRequest) {
        // Proceed if email verification request is in progress, regardless
        // of user existence
        return true;
    }
    const existingUser = await data_1.databaseAdapter.getOneUserSafe({ id: email }, context);
    // Check if this is being called in the Google auth flow.
    // If so, update the user's name and image if they are null.
    // also, update the user's emailVerified if the email is verified by Google.
    const isGoogle = nextauthProfile !== undefined &&
        'iss' in nextauthProfile &&
        nextauthProfile.iss === 'https://accounts.google.com';
    if (!isGoogle) {
        // If not Google auth flow, user must exist
        return existingUser !== null;
    }
    const { email_verified, name, picture: imageUrl, } = nextauthProfile;
    if (!email_verified) {
        // Do not proceed if google account email is not verified
        return false;
    }
    // Automatically create user when signing in with Google
    const user = existingUser ?? (await data_1.databaseAdapter.createOneUser({ email }, context));
    const data = {};
    if (user.emailVerified === null && email_verified) {
        data.emailVerified = context.time;
    }
    if (!user.name && name) {
        data.name = name;
    }
    if (user.imageUrl === null && imageUrl) {
        data.imageUrl = imageUrl;
    }
    if (Object.keys(data).length > 0) {
        await data_1.databaseAdapter.updateOneUser(user, data, context);
    }
    // Find and update account
    if (nextauthAccount !== null) {
        const existingAccount = await data_1.databaseAdapter.getOneNextauthAccountSafe({
            provider: nextauthAccount.provider,
            providerAccountId: nextauthAccount.providerAccountId,
        }, context);
        if (existingAccount !== null) {
            const account = (0, data_1.updateOneNextauthAccountBodyFromAdapterAccount)({
                ...nextauthAccount,
                userId: nextauthAccount.userId ?? user.id,
                type: nextauthAccount.type,
                provider: nextauthAccount.provider,
                providerAccountId: nextauthAccount.providerAccountId,
            });
            await data_1.databaseAdapter.updateOneNextauthAccount(existingAccount, account, context);
        }
    }
    return true;
};
const redirect = async ({ url, baseUrl }) => {
    if (url.startsWith('/')) {
        // Allows relative callback URLs
        return `${baseUrl}${url}`;
    }
    const urlOrigin = new URL(url).origin;
    if (urlOrigin === baseUrl ||
        urlOrigin.endsWith(config_1.publicConfig.service.rootDomain)) {
        // Allows callback URLs on the same origin
        return url;
    }
    return baseUrl;
};
exports.callbacks = { signIn, redirect };
//# sourceMappingURL=callbacks.js.map