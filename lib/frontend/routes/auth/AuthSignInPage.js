"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamic = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const adapter_1 = require("@airdev/next/adapter");
const user_server_1 = require("@airdev/next/frontend/hooks/data/user-server");
const SignInStepsClient_1 = __importDefault(require("@airdev/next/frontend/routes/auth/SignInStepsClient"));
const page_1 = require("@airdev/next/frontend/utils/page");
const react_query_1 = require("@tanstack/react-query");
const navigation_1 = require("next/navigation");
const react_1 = require("react");
exports.dynamic = 'force-dynamic';
async function AuthSignInPage({ searchParams }) {
    const queryClient = new react_query_1.QueryClient();
    const resolvedSearchParams = await searchParams;
    const next = typeof resolvedSearchParams.next === 'string'
        ? resolvedSearchParams.next
        : undefined;
    const currentUser = await queryClient.fetchQuery(user_server_1.currentUserServerQueryOptions);
    if (currentUser) {
        (0, navigation_1.redirect)(next || adapter_1.shellAdapter.navigation.homeHref);
    }
    return ((0, jsx_runtime_1.jsx)(react_1.Suspense, { children: (0, jsx_runtime_1.jsx)(SignInStepsClient_1.default, {}) }));
}
const SafeAuthSignInPage = (0, page_1.withError)(AuthSignInPage);
exports.default = SafeAuthSignInPage;
//# sourceMappingURL=AuthSignInPage.js.map