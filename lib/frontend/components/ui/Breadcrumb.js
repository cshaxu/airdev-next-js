import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../utils/cn';
import { Slot } from '@radix-ui/react-slot';
import { ChevronRight, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';
const Breadcrumb = React.forwardRef(({ ...props }, ref) => _jsx("nav", { ref: ref, "aria-label": "breadcrumb", ...props }));
Breadcrumb.displayName = 'Breadcrumb';
const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => (_jsx("ol", { ref: ref, className: cn('text-muted-foreground text-body flex flex-wrap items-center gap-1.5 font-medium break-words sm:gap-2.5', className), ...props })));
BreadcrumbList.displayName = 'BreadcrumbList';
const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => (_jsx("li", { ref: ref, className: cn('inline-flex items-center gap-1.5', className), ...props })));
BreadcrumbItem.displayName = 'BreadcrumbItem';
const BreadcrumbLink = React.forwardRef(({ asChild, className, href, ...props }, ref) => {
    const Comp = asChild ? Slot : Link;
    return (_jsx(Comp, { ref: ref, href: href, className: cn('hover:text-foreground transition-colors duration-200 hover:opacity-80', className), ...props }));
});
BreadcrumbLink.displayName = 'BreadcrumbLink';
const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => (_jsx("span", { ref: ref, role: "link", "aria-disabled": "true", "aria-current": "page", className: cn('text-foreground', className), ...props })));
BreadcrumbPage.displayName = 'BreadcrumbPage';
const BreadcrumbSeparator = ({ children, className, ...props }) => (_jsx("li", { role: "presentation", "aria-hidden": "true", className: cn('text-muted-foreground/50 [&>svg]:h-3.5 [&>svg]:w-3.5', className), ...props, children: children ?? _jsx(ChevronRight, {}) }));
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
const BreadcrumbEllipsis = ({ className, ...props }) => (_jsxs("span", { role: "presentation", "aria-hidden": "true", className: cn('flex size-9 items-center justify-center', className), ...props, children: [_jsx(MoreHorizontal, { className: "size-4" }), _jsx("span", { className: "sr-only", children: "More" })] }));
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';
export { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, };
//# sourceMappingURL=Breadcrumb.js.map