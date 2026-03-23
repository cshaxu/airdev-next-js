"use strict";
'use client';
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
exports.BottomPopupSheetContent = void 0;
exports.BottomPopupSheet = BottomPopupSheet;
exports.BottomPopupSheetClose = BottomPopupSheetClose;
exports.BottomPopupSheetDescription = BottomPopupSheetDescription;
exports.BottomPopupSheetHeader = BottomPopupSheetHeader;
exports.BottomPopupSheetTitle = BottomPopupSheetTitle;
exports.BottomPopupSheetTrigger = BottomPopupSheetTrigger;
const jsx_runtime_1 = require("react/jsx-runtime");
const DialogPrimitive = __importStar(require("@radix-ui/react-dialog"));
const lucide_react_1 = require("lucide-react");
const React = __importStar(require("react"));
const cn_1 = require("@airdev/next/frontend/lib/cn");
function BottomPopupSheet(props) {
    return (0, jsx_runtime_1.jsx)(DialogPrimitive.Root, { "data-slot": "bottom-popup-sheet", ...props });
}
function BottomPopupSheetTrigger(props) {
    return ((0, jsx_runtime_1.jsx)(DialogPrimitive.Trigger, { "data-slot": "bottom-popup-sheet-trigger", ...props }));
}
function BottomPopupSheetClose(props) {
    return ((0, jsx_runtime_1.jsx)(DialogPrimitive.Close, { "data-slot": "bottom-popup-sheet-close", ...props }));
}
const BottomPopupSheetContent = React.forwardRef(({ className, children, overlayClassName, overlayStyle, onRequestClose, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsxs)(DialogPrimitive.Portal, { children: [(0, jsx_runtime_1.jsx)(DialogPrimitive.Overlay, { "data-slot": "bottom-popup-sheet-overlay", className: (0, cn_1.cn)('fixed inset-0 z-50 bg-black/50', overlayClassName), style: overlayStyle }), (0, jsx_runtime_1.jsxs)(DialogPrimitive.Content, { ref: ref, "data-slot": "bottom-popup-sheet-content", className: (0, cn_1.cn)('bg-background fixed inset-x-0 bottom-0 z-50 flex flex-col gap-4 border-t shadow-lg', className), ...props, children: [children, (0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: onRequestClose, className: "ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.XIcon, { className: "size-4" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Close" })] })] })] }));
});
exports.BottomPopupSheetContent = BottomPopupSheetContent;
BottomPopupSheetContent.displayName = 'BottomPopupSheetContent';
function BottomPopupSheetHeader({ className, ...props }) {
    return ((0, jsx_runtime_1.jsx)("div", { "data-slot": "bottom-popup-sheet-header", className: (0, cn_1.cn)('flex flex-col gap-1.5 p-4', className), ...props }));
}
function BottomPopupSheetTitle({ className, ...props }) {
    return ((0, jsx_runtime_1.jsx)(DialogPrimitive.Title, { "data-slot": "bottom-popup-sheet-title", className: (0, cn_1.cn)('text-foreground font-semibold', className), ...props }));
}
function BottomPopupSheetDescription({ className, ...props }) {
    return ((0, jsx_runtime_1.jsx)(DialogPrimitive.Description, { "data-slot": "bottom-popup-sheet-description", className: (0, cn_1.cn)('text-muted-foreground text-sm', className), ...props }));
}
//# sourceMappingURL=BottomPopupSheet.js.map