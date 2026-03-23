"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const shell_1 = require("@airdev/next/adapter/frontend/shell");
const config_1 = require("@airdev/next/common/config");
const AuthError_1 = __importDefault(require("@airdev/next/frontend/components/auth/AuthError"));
const page_1 = require("@airdev/next/frontend/utils/page");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
function AuthErrorPageContent() {
    const searchParams = (0, navigation_1.useSearchParams)();
    const error = searchParams.get('error');
    const isVerificationError = error === 'Verification';
    return ((0, jsx_runtime_1.jsx)(AuthError_1.default, { appName: config_1.publicConfig.app.name, isVerificationError: isVerificationError, logoSrc: shell_1.shellAdapter.component.logoSrc }));
}
function AuthErrorPage() {
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { children: (0, jsx_runtime_1.jsx)(AuthErrorPageContent, {}) }));
}
const SafeAuthErrorPage = (0, page_1.withError)(AuthErrorPage);
exports.default = SafeAuthErrorPage;
//# sourceMappingURL=AuthErrorPage.js.map