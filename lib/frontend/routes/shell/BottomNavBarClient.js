"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BottomNavBarClient;
const jsx_runtime_1 = require("react/jsx-runtime");
const api_client_1 = require("@airdev/next/adapter/frontend/api-client");
const shell_1 = require("@airdev/next/adapter/frontend/shell");
const BottomNavBar_1 = __importDefault(require("@airdev/next/frontend/components/shell/BottomNavBar"));
function BottomNavBarClient() {
    return ((0, jsx_runtime_1.jsx)(BottomNavBar_1.default, { adminHref: shell_1.shellAdapter.navigation.adminHref, becomeUser: api_client_1.apiClientAdapter.becomeUser, logoutCallbackUrl: shell_1.shellAdapter.navigation.logoutCallbackUrl, navItems: shell_1.shellAdapter.navigation.primaryItems, settingsHref: shell_1.shellAdapter.navigation.settingsHref }));
}
//# sourceMappingURL=BottomNavBarClient.js.map