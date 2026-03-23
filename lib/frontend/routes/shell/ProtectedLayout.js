"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamic = void 0;
exports.default = ProtectedLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const ProtectedLayoutView_1 = __importDefault(require("@airdev/next/frontend/components/shell/ProtectedLayoutView"));
const initializePermission_1 = require("@airdev/next/frontend/initializePermission");
const CurrentUserProvider_1 = __importDefault(require("@airdev/next/frontend/providers/CurrentUserProvider"));
const BottomNavBarClient_1 = __importDefault(require("@airdev/next/frontend/routes/shell/BottomNavBarClient"));
const SideNavBarClient_1 = __importDefault(require("@airdev/next/frontend/routes/shell/SideNavBarClient"));
const react_query_1 = require("@tanstack/react-query");
exports.dynamic = 'force-dynamic';
async function ProtectedLayout({ children }) {
    const queryClient = new react_query_1.QueryClient();
    await (0, initializePermission_1.initializePermission)(queryClient);
    return ((0, jsx_runtime_1.jsxs)(react_query_1.HydrationBoundary, { state: (0, react_query_1.dehydrate)(queryClient), children: [(0, jsx_runtime_1.jsx)(CurrentUserProvider_1.default, {}), (0, jsx_runtime_1.jsx)(ProtectedLayoutView_1.default, { sideNav: (0, jsx_runtime_1.jsx)(SideNavBarClient_1.default, {}), bottomNav: (0, jsx_runtime_1.jsx)(BottomNavBarClient_1.default, {}), children: children })] }));
}
//# sourceMappingURL=ProtectedLayout.js.map