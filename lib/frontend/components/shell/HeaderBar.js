'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsiveBreadcrumb } from '../ui/ResponsiveBreadcrumb';
import TranslateButton from './TranslateButton';
export default function HeaderBar({ children, items, isLoading = false, }) {
    if (isLoading) {
        return (_jsx("div", { className: "header-bg dark:bg-background/80 flex h-12 w-full items-center px-6 backdrop-blur-lg" }));
    }
    return (_jsxs("div", { className: "header-bg dark:bg-background/80 flex h-12 w-full items-center px-6 backdrop-blur-lg", children: [items?.length && (_jsx("div", { className: "flex min-w-0 flex-1 items-center gap-2", children: _jsx("div", { className: "min-w-[36px] flex-shrink flex-grow basis-0", children: _jsx(ResponsiveBreadcrumb, { items: items, renderItem: (item) => item.icon ? (_jsx("span", { className: "text-muted-foreground hover:text-foreground", children: item.icon })) : (item.label) }) }) })), children, _jsx("div", { className: "flex flex-1 items-center justify-end space-x-4 pl-8", children: _jsx(TranslateButton, {}) })] }));
}
//# sourceMappingURL=HeaderBar.js.map