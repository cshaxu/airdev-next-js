"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HeaderBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const ResponsiveBreadcrumb_1 = require("@airdev/next/frontend/components/ui/ResponsiveBreadcrumb");
const TranslateButton_1 = __importDefault(require("./TranslateButton"));
function HeaderBar({ children, items, isLoading = false, actions, }) {
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "header-bg dark:bg-background/80 flex h-12 w-full items-center px-6 backdrop-blur-lg" }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "header-bg dark:bg-background/80 flex h-12 w-full items-center px-6 backdrop-blur-lg", children: [items?.length && ((0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 items-center gap-2", children: (0, jsx_runtime_1.jsx)("div", { className: "min-w-[36px] flex-shrink flex-grow basis-0", children: (0, jsx_runtime_1.jsx)(ResponsiveBreadcrumb_1.ResponsiveBreadcrumb, { items: items, renderItem: (item) => item.icon ? ((0, jsx_runtime_1.jsx)("span", { className: "text-muted-foreground hover:text-foreground", children: item.icon })) : (item.label) }) }) })), children, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center justify-end space-x-4 pl-8", children: [actions, (0, jsx_runtime_1.jsx)(TranslateButton_1.default, {})] })] }));
}
//# sourceMappingURL=HeaderBar.js.map