'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '../../utils/cn.js';
function BottomPopupSheet(props) {
    return _jsx(DialogPrimitive.Root, { "data-slot": "bottom-popup-sheet", ...props });
}
function BottomPopupSheetTrigger(props) {
    return (_jsx(DialogPrimitive.Trigger, { "data-slot": "bottom-popup-sheet-trigger", ...props }));
}
function BottomPopupSheetClose(props) {
    return (_jsx(DialogPrimitive.Close, { "data-slot": "bottom-popup-sheet-close", ...props }));
}
const BottomPopupSheetContent = React.forwardRef(({ className, children, overlayClassName, overlayStyle, onRequestClose, ...props }, ref) => {
    return (_jsxs(DialogPrimitive.Portal, { children: [_jsx(DialogPrimitive.Overlay, { "data-slot": "bottom-popup-sheet-overlay", className: cn('fixed inset-0 z-50 bg-black/50', overlayClassName), style: overlayStyle }), _jsxs(DialogPrimitive.Content, { ref: ref, "data-slot": "bottom-popup-sheet-content", className: cn('bg-background fixed inset-x-0 bottom-0 z-50 flex flex-col gap-4 border-t shadow-lg', className), ...props, children: [children, _jsxs("button", { type: "button", onClick: onRequestClose, className: "ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none", children: [_jsx(XIcon, { className: "size-4" }), _jsx("span", { className: "sr-only", children: "Close" })] })] })] }));
});
BottomPopupSheetContent.displayName = 'BottomPopupSheetContent';
function BottomPopupSheetHeader({ className, ...props }) {
    return (_jsx("div", { "data-slot": "bottom-popup-sheet-header", className: cn('flex flex-col gap-1.5 p-4', className), ...props }));
}
function BottomPopupSheetTitle({ className, ...props }) {
    return (_jsx(DialogPrimitive.Title, { "data-slot": "bottom-popup-sheet-title", className: cn('text-foreground font-semibold', className), ...props }));
}
function BottomPopupSheetDescription({ className, ...props }) {
    return (_jsx(DialogPrimitive.Description, { "data-slot": "bottom-popup-sheet-description", className: cn('text-muted-foreground text-sm', className), ...props }));
}
export { BottomPopupSheet, BottomPopupSheetClose, BottomPopupSheetContent, BottomPopupSheetDescription, BottomPopupSheetHeader, BottomPopupSheetTitle, BottomPopupSheetTrigger, };
//# sourceMappingURL=BottomPopupSheet.js.map