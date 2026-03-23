"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminNav;
const jsx_runtime_1 = require("react/jsx-runtime");
const HeaderBar_1 = __importDefault(require("@airdev/next/frontend/components/shell/HeaderBar"));
const cn_1 = require("@airdev/next/frontend/lib/cn");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
function AdminNav({ tabs }) {
    const pathname = (0, navigation_1.usePathname)();
    return ((0, jsx_runtime_1.jsx)(HeaderBar_1.default, { children: (0, jsx_runtime_1.jsx)("div", { className: "flex gap-1", children: tabs.map((tab) => {
                const isActive = tab.match
                    ? tab.match(pathname)
                    : pathname === tab.href || pathname.startsWith(`${tab.href}/`);
                return ((0, jsx_runtime_1.jsx)(link_1.default, { href: tab.href, className: (0, cn_1.cn)('rounded-md px-3 py-1.5 text-sm font-medium transition-colors', isActive
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'), children: tab.label }, tab.href));
            }) }) }));
}
//# sourceMappingURL=AdminNav.js.map