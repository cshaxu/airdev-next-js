"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthError;
const jsx_runtime_1 = require("react/jsx-runtime");
function AuthError({ appName, isVerificationError, logoSrc, }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center justify-center space-y-4 space-x-2", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-2xl font-bold", children: "Unable to sign in" }), (0, jsx_runtime_1.jsx)("img", { className: "h-24 w-24", src: logoSrc, alt: appName }), isVerificationError ? ((0, jsx_runtime_1.jsx)("p", { className: "px-6 text-lg", children: "The verification code is no longer valid. It may have been used already or it may have expired. Please request a new verification code." })) : ((0, jsx_runtime_1.jsx)("p", { className: "mx-3 text-lg", children: "Something went wrong. Please try again later." }))] }) }));
}
//# sourceMappingURL=AuthError.js.map