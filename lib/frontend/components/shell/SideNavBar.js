"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SideNavBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("@airdev/next/frontend/components/ui/Button");
const PixelResizable_1 = require("@airdev/next/frontend/components/ui/PixelResizable");
const cn_1 = require("@airdev/next/frontend/lib/cn");
const image_1 = __importDefault(require("next/image"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const UserButton_1 = __importDefault(require("./UserButton"));
const defaultCollapseMatcher = (pathname) => pathname.startsWith('/admin');
function SideNavLink({ label, icon, to, isFull, isActive }) {
    return ((0, jsx_runtime_1.jsxs)(link_1.default, { href: to, className: (0, cn_1.cn)((0, Button_1.buttonVariants)({ variant: 'ghost' }), isFull ? 'rounded-xl' : 'rounded-full', 'p-2', 'nav-text', 'hover:bg-[var(--nav-hover)]', isActive && 'nav-active', isFull ? 'justify-start' : 'justify-center'), title: isFull ? undefined : label, children: [icon, isFull && (0, jsx_runtime_1.jsx)("span", { className: "ml-2", children: label })] }));
}
function SideNavBar({ adminHref, appName, becomeUser, logoSrc, logoutCallbackUrl, navItems, settingsHref, shouldAutoCollapse, }) {
    const pathname = (0, navigation_1.usePathname)();
    const lastPathRef = (0, react_1.useRef)(pathname);
    const collapseMatcher = shouldAutoCollapse ?? defaultCollapseMatcher;
    const shouldCollapse = collapseMatcher(pathname);
    const [isCollapsed, setIsCollapsed] = (0, react_1.useState)(shouldCollapse);
    (0, react_1.useEffect)(() => {
        const wasCollapsePage = collapseMatcher(lastPathRef.current);
        const isCollapsePage = collapseMatcher(pathname);
        if (wasCollapsePage !== isCollapsePage) {
            setIsCollapsed(isCollapsePage);
        }
        lastPathRef.current = pathname;
    }, [pathname, collapseMatcher]);
    return ((0, jsx_runtime_1.jsx)(PixelResizable_1.PixelResizablePanel, { collapsedSize: 56, minSize: 200, maxSize: 480, defaultSize: 240, isCollapsed: isCollapsed, onCollapseChange: setIsCollapsed, children: (0, jsx_runtime_1.jsxs)("div", { className: "nav-bg flex h-full flex-col gap-4 overflow-y-auto px-2 py-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center', !isCollapsed ? 'gap-2' : 'justify-center'), children: [(0, jsx_runtime_1.jsx)(image_1.default, { src: logoSrc, alt: "Logo", width: 40, height: 40, className: "size-10" }), !isCollapsed && ((0, jsx_runtime_1.jsx)("span", { className: "nav-icon text-xl font-bold", children: appName }))] }), (0, jsx_runtime_1.jsx)("div", { className: "nav-separator mx-4 h-px" }), (0, jsx_runtime_1.jsx)("nav", { className: "flex flex-col gap-1", children: navItems.map((item) => {
                        const isActive = item.match
                            ? item.match(pathname)
                            : pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return ((0, jsx_runtime_1.jsx)(SideNavLink, { label: item.label, to: item.href, icon: item.renderIcon('nav-icon size-4'), isFull: !isCollapsed, isActive: isActive }, item.href));
                    }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1" }), (0, jsx_runtime_1.jsx)(UserButton_1.default, { mode: "sidebar", isFull: !isCollapsed, adminHref: adminHref, becomeUser: becomeUser, logoutCallbackUrl: logoutCallbackUrl, settingsHref: settingsHref })] }) }));
}
//# sourceMappingURL=SideNavBar.js.map