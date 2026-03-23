"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignInStepsClient;
const jsx_runtime_1 = require("react/jsx-runtime");
const query_1 = require("@airdev/next/adapter/frontend/query");
const shell_1 = require("@airdev/next/adapter/frontend/shell");
const config_1 = require("@airdev/next/common/config");
const SignInSteps_1 = __importDefault(require("@airdev/next/frontend/components/auth/SignInSteps"));
function SignInStepsClient() {
    return ((0, jsx_runtime_1.jsx)(SignInSteps_1.default, { appName: config_1.publicConfig.app.name, defaultCallbackUrl: shell_1.shellAdapter.navigation.homeHref, homeHref: shell_1.shellAdapter.navigation.homeHref, ownerShort: config_1.publicConfig.app.ownerShort, privacyHref: shell_1.shellAdapter.navigation.privacyHref, termsHref: shell_1.shellAdapter.navigation.termsHref, useCreateOneNextauthVerificationToken: query_1.clientQueryAdapter.useCreateOneNextauthVerificationToken, verificationCodeLength: config_1.publicConfig.auth.verificationCodeLength }));
}
//# sourceMappingURL=SignInStepsClient.js.map