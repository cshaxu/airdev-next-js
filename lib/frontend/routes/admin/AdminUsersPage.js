"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const api_client_1 = require("@airdev/next/adapter/frontend/api-client");
const query_1 = require("@airdev/next/adapter/frontend/query");
const UserSearch_1 = __importDefault(require("@airdev/next/frontend/components/admin/UserSearch"));
const page_1 = require("@airdev/next/frontend/utils/page");
function AdminUsersPage() {
    return ((0, jsx_runtime_1.jsx)(UserSearch_1.default, { becomeUser: api_client_1.apiClientAdapter.becomeUser, getManyUsersQueryOptions: query_1.clientQueryAdapter.getManyUsersQueryOptions, useUpdateOneUser: query_1.clientQueryAdapter.useUpdateOneUser }));
}
const SafeAdminUsersPage = (0, page_1.withError)(AdminUsersPage);
exports.default = SafeAdminUsersPage;
//# sourceMappingURL=AdminUsersPage.js.map