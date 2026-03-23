"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamic = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const shell_1 = require("@airdev/next/adapter/frontend/shell");
const cookies_1 = require("@airdev/next/backend/lib/nextauth/cookies");
const user_server_1 = require("@airdev/next/frontend/hooks/data/user-server");
const page_1 = require("@airdev/next/frontend/utils/page");
const react_query_1 = require("@tanstack/react-query");
const headers_1 = require("next/headers");
const navigation_1 = require("next/navigation");
exports.dynamic = 'force-dynamic';
async function LandingPage() {
    const cookieStore = await (0, headers_1.cookies)();
    const LandingComponent = shell_1.shellAdapter.component.LandingComponent;
    if (!cookieStore.has(cookies_1.SESSION_TOKEN_COOKIE_NAME)) {
        return (0, jsx_runtime_1.jsx)(LandingComponent, {});
    }
    const queryClient = new react_query_1.QueryClient();
    const currentUser = await queryClient.fetchQuery(user_server_1.currentUserServerQueryOptions);
    if (currentUser !== null) {
        (0, navigation_1.redirect)(shell_1.shellAdapter.navigation.homeHref);
    }
    return (0, jsx_runtime_1.jsx)(LandingComponent, {});
}
const SafeLandingPage = (0, page_1.withError)(LandingPage);
exports.default = SafeLandingPage;
//# sourceMappingURL=LandingPage.js.map