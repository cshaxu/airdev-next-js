import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import CurrentUserProvider from "../../providers/CurrentUserProvider";
import BottomNavBar from "./BottomNavBar";
import ProtectedRouteRedirect from "./ProtectedRouteRedirect";
import SideNavBar from "./SideNavBar";
export function generateProtectedLayoutMetadata() {
    return { robots: { index: false, follow: false, nocache: true } };
}
export default function ProtectedLayout({ children }) {
    return (_jsxs(_Fragment, { children: [_jsx(CurrentUserProvider, {}), _jsx(ProtectedRouteRedirect, {}), _jsxs("div", { className: "flex h-screen flex-col overflow-hidden", children: [_jsx("main", { className: "h-full flex-1 overflow-hidden", children: _jsxs("div", { className: "flex h-full", children: [_jsx("div", { className: "hidden h-full md:block [@media(orientation:portrait)]:hidden", children: _jsx(SideNavBar, {}) }), _jsx("div", { className: "protected-mobile-main h-full min-w-0 flex-1 overflow-hidden pb-16 md:pb-0 [@media(orientation:portrait)]:pb-16", children: children })] }) }), _jsx(BottomNavBar, {})] })] }));
}
//# sourceMappingURL=ProtectedLayout.js.map