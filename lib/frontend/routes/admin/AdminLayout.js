"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const shell_1 = require("@airdev/next/adapter/frontend/shell");
const framework_1 = require("@airdev/next/backend/lib/framework");
const AdminLayoutView_1 = __importDefault(require("@airdev/next/frontend/components/admin/AdminLayoutView"));
const initializePermission_1 = require("@airdev/next/frontend/initializePermission");
const react_query_1 = require("@tanstack/react-query");
const navigation_1 = require("next/navigation");
async function AdminLayout({ children }) {
    const queryClient = new react_query_1.QueryClient();
    await (0, initializePermission_1.initializePermission)(queryClient);
    const realCurrentUser = await (0, framework_1.getRealCurrentUser)();
    if (!realCurrentUser?.isAdmin) {
        return (0, navigation_1.redirect)('/');
    }
    return ((0, jsx_runtime_1.jsx)(AdminLayoutView_1.default, { tabs: shell_1.shellAdapter.navigation.adminTabItems, children: children }));
}
//# sourceMappingURL=AdminLayout.js.map