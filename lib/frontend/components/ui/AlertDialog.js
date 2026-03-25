'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../utils/cn.js';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as React from 'react';
import { buttonVariants } from './Button.js';
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => (_jsx(AlertDialogPrimitive.Overlay, { className: cn('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className), ...props, ref: ref })));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (_jsxs(AlertDialogPortal, { children: [_jsx(AlertDialogOverlay, {}), _jsx(AlertDialogPrimitive.Content, { ref: ref, className: cn('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] border-input fixed top-[50%] left-[50%] z-50 grid w-[calc(100vw-40px)] max-w-sm translate-x-[-50%] translate-y-[-50%] gap-6 rounded-3xl border p-6 duration-200', className), ...props })] })));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({ className, ...props }) => (_jsx("div", { className: cn('flex flex-col space-y-4 text-center', className), ...props }));
AlertDialogHeader.displayName = 'AlertDialogHeader';
const AlertDialogFooter = ({ className, ...props }) => (_jsx("div", { className: cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className), ...props }));
AlertDialogFooter.displayName = 'AlertDialogFooter';
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (_jsx(AlertDialogPrimitive.Title, { ref: ref, className: cn('text-body-large font-medium', className), ...props })));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (_jsx(AlertDialogPrimitive.Description, { ref: ref, className: cn('text-body text-muted-foreground text-left', className), ...props })));
AlertDialogDescription.displayName =
    AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => (_jsx(AlertDialogPrimitive.Action, { ref: ref, className: cn(buttonVariants({ variant: 'destructive' }), className), ...props })));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => (_jsx(AlertDialogPrimitive.Cancel, { ref: ref, className: cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className), ...props })));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
export { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger, };
//# sourceMappingURL=AlertDialog.js.map