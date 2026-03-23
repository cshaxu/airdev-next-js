"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const query_1 = require("@airdev/next/adapter/frontend/query");
const shell_1 = require("@airdev/next/adapter/frontend/shell");
const Settings_1 = __importDefault(require("@airdev/next/frontend/components/settings/Settings"));
const page_1 = require("@airdev/next/frontend/utils/page");
function SettingsPage() {
    return ((0, jsx_runtime_1.jsx)(Settings_1.default, { homeHref: shell_1.shellAdapter.navigation.homeHref, logoutCallbackUrl: shell_1.shellAdapter.navigation.logoutCallbackUrl, useDeleteOneUser: query_1.clientQueryAdapter.useDeleteOneUser, useUpdateOneUser: query_1.clientQueryAdapter.useUpdateOneUser }));
}
const SafeSettingsPage = (0, page_1.withError)(SettingsPage);
exports.default = SafeSettingsPage;
//# sourceMappingURL=SettingsPage.js.map