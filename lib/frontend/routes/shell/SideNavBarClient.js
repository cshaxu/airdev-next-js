"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SideNavBarClient;
const jsx_runtime_1 = require("react/jsx-runtime");
const api_client_1 = require("@airdev/next/adapter/frontend/api-client");
const shell_1 = require("@airdev/next/adapter/frontend/shell");
const config_1 = require("@airdev/next/common/config");
const SideNavBar_1 = __importDefault(require("@airdev/next/frontend/components/shell/SideNavBar"));
function SideNavBarClient() {
    return ((0, jsx_runtime_1.jsx)(SideNavBar_1.default, { adminHref: shell_1.shellAdapter.navigation.adminHref, appName: config_1.publicConfig.app.name, becomeUser: api_client_1.apiClientAdapter.becomeUser, logoSrc: shell_1.shellAdapter.component.logoSrc, logoutCallbackUrl: shell_1.shellAdapter.navigation.logoutCallbackUrl, navItems: shell_1.shellAdapter.navigation.primaryItems, settingsHref: shell_1.shellAdapter.navigation.settingsHref, shouldAutoCollapse: shell_1.shellAdapter.navigation.shouldAutoCollapse }));
}
//# sourceMappingURL=SideNavBarClient.js.map