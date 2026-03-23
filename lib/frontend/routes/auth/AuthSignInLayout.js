"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthSignInLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const config_1 = require("@airdev/next/common/config");
const SignInLayoutView_1 = __importDefault(require("@airdev/next/frontend/components/auth/SignInLayoutView"));
function AuthSignInLayout({ children }) {
    const { name, description } = config_1.publicConfig.app;
    return ((0, jsx_runtime_1.jsx)(SignInLayoutView_1.default, { appName: name, appDescription: description, children: children }));
}
//# sourceMappingURL=AuthSignInLayout.js.map