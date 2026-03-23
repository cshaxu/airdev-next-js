"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignInSteps;
const jsx_runtime_1 = require("react/jsx-runtime");
const nuqs_1 = require("nuqs");
const react_1 = require("react");
const SignInStart_1 = __importDefault(require("./SignInStart"));
const SignInVerify_1 = __importDefault(require("./SignInVerify"));
function SignInSteps({ appName, defaultCallbackUrl, homeHref, ownerShort, privacyHref, termsHref, useCreateOneNextauthVerificationToken, verificationCodeLength, }) {
    const [step] = (0, nuqs_1.useQueryState)('step', nuqs_1.parseAsString.withDefault('1'));
    const [email, setEmail] = (0, react_1.useState)();
    if (step === '1' || email === undefined) {
        return ((0, jsx_runtime_1.jsx)(SignInStart_1.default, { appName: appName, homeHref: homeHref, ownerShort: ownerShort, privacyHref: privacyHref, setEmail: setEmail, termsHref: termsHref, useCreateOneNextauthVerificationToken: useCreateOneNextauthVerificationToken }));
    }
    if (step === '2') {
        return ((0, jsx_runtime_1.jsx)(SignInVerify_1.default, { defaultCallbackUrl: defaultCallbackUrl, email: email, useCreateOneNextauthVerificationToken: useCreateOneNextauthVerificationToken, verificationCodeLength: verificationCodeLength }));
    }
    return null;
}
//# sourceMappingURL=SignInSteps.js.map