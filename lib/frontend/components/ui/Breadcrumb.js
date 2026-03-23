"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BreadcrumbSeparator = exports.BreadcrumbPage = exports.BreadcrumbList = exports.BreadcrumbLink = exports.BreadcrumbItem = exports.BreadcrumbEllipsis = exports.Breadcrumb = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("@airdev/next/frontend/lib/cn");
const react_slot_1 = require("@radix-ui/react-slot");
const lucide_react_1 = require("lucide-react");
const React = __importStar(require("react"));
const Breadcrumb = React.forwardRef(({ ...props }, ref) => (0, jsx_runtime_1.jsx)("nav", { ref: ref, "aria-label": "breadcrumb", ...props }));
exports.Breadcrumb = Breadcrumb;
Breadcrumb.displayName = 'Breadcrumb';
const BreadcrumbList = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("ol", { ref: ref, className: (0, cn_1.cn)('text-muted-foreground text-body flex flex-wrap items-center gap-1.5 font-medium break-words sm:gap-2.5', className), ...props })));
exports.BreadcrumbList = BreadcrumbList;
BreadcrumbList.displayName = 'BreadcrumbList';
const BreadcrumbItem = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("li", { ref: ref, className: (0, cn_1.cn)('inline-flex items-center gap-1.5', className), ...props })));
exports.BreadcrumbItem = BreadcrumbItem;
BreadcrumbItem.displayName = 'BreadcrumbItem';
const BreadcrumbLink = React.forwardRef(({ asChild, className, ...props }, ref) => {
    const Comp = asChild ? react_slot_1.Slot : 'a';
    return ((0, jsx_runtime_1.jsx)(Comp, { ref: ref, className: (0, cn_1.cn)('hover:text-foreground transition-colors duration-200 hover:opacity-80', className), ...props }));
});
exports.BreadcrumbLink = BreadcrumbLink;
BreadcrumbLink.displayName = 'BreadcrumbLink';
const BreadcrumbPage = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)("span", { ref: ref, role: "link", "aria-disabled": "true", "aria-current": "page", className: (0, cn_1.cn)('text-foreground', className), ...props })));
exports.BreadcrumbPage = BreadcrumbPage;
BreadcrumbPage.displayName = 'BreadcrumbPage';
const BreadcrumbSeparator = ({ children, className, ...props }) => ((0, jsx_runtime_1.jsx)("li", { role: "presentation", "aria-hidden": "true", className: (0, cn_1.cn)('text-muted-foreground/50 [&>svg]:h-3.5 [&>svg]:w-3.5', className), ...props, children: children ?? (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, {}) }));
exports.BreadcrumbSeparator = BreadcrumbSeparator;
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';
const BreadcrumbEllipsis = ({ className, ...props }) => ((0, jsx_runtime_1.jsxs)("span", { role: "presentation", "aria-hidden": "true", className: (0, cn_1.cn)('flex size-9 items-center justify-center', className), ...props, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.MoreHorizontal, { className: "size-4" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "More" })] }));
exports.BreadcrumbEllipsis = BreadcrumbEllipsis;
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis';
//# sourceMappingURL=Breadcrumb.js.map