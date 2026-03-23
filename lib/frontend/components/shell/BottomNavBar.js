"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BottomNavBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const user_1 = require("@airdev/next/frontend/hooks/data/user");
const cn_1 = require("@airdev/next/frontend/lib/cn");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const UserButton_1 = __importDefault(require("./UserButton"));
function BottomNavBar({ adminHref, becomeUser, logoutCallbackUrl, navItems, settingsHref, }) {
    const pathname = (0, navigation_1.usePathname)();
    (0, user_1.useRequiredCurrentUser)();
    const navItemsRef = (0, react_1.useRef)(null);
    const [showLabels, setShowLabels] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        const element = navItemsRef.current;
        if (!element) {
            return;
        }
        const updateLabelVisibility = () => {
            const minTabWidthForLabel = 74;
            const tabCount = navItems.length + 1;
            const shouldShow = element.clientWidth >= tabCount * minTabWidthForLabel;
            setShowLabels(shouldShow);
        };
        updateLabelVisibility();
        const observer = new ResizeObserver(updateLabelVisibility);
        observer.observe(element);
        return () => observer.disconnect();
    }, [navItems.length]);
    return ((0, jsx_runtime_1.jsx)("nav", { className: (0, cn_1.cn)('mobile-bottom-nav bg-background/95 border-border fixed right-0 bottom-0 left-0 z-40 border-t backdrop-blur', 'md:hidden'), style: { paddingBottom: 'max(env(safe-area-inset-bottom), 0px)' }, children: (0, jsx_runtime_1.jsxs)("div", { ref: navItemsRef, className: "mx-auto flex h-16 max-w-xl items-center px-2", children: [navItems.map((item) => {
                    const isActive = item.match
                        ? item.match(pathname)
                        : pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return ((0, jsx_runtime_1.jsxs)(link_1.default, { href: item.href, className: (0, cn_1.cn)('flex flex-1 flex-col items-center gap-1 rounded-lg py-1 text-[11px] transition-colors', isActive ? 'text-foreground' : 'text-muted-foreground'), children: [item.renderIcon('size-5'), showLabels && ((0, jsx_runtime_1.jsx)("span", { className: "whitespace-nowrap", children: item.label }))] }, item.href));
                }), (0, jsx_runtime_1.jsx)(UserButton_1.default, { mode: "bottom-nav", showLabel: showLabels, adminHref: adminHref, becomeUser: becomeUser, logoutCallbackUrl: logoutCallbackUrl, settingsHref: settingsHref })] }) }));
}
//# sourceMappingURL=BottomNavBar.js.map