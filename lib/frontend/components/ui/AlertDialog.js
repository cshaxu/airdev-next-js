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
exports.AlertDialogTrigger = exports.AlertDialogTitle = exports.AlertDialogPortal = exports.AlertDialogOverlay = exports.AlertDialogHeader = exports.AlertDialogFooter = exports.AlertDialogDescription = exports.AlertDialogContent = exports.AlertDialogCancel = exports.AlertDialogAction = exports.AlertDialog = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("@airdev/next/frontend/components/ui/Button");
const cn_1 = require("@airdev/next/frontend/lib/cn");
const AlertDialogPrimitive = __importStar(require("@radix-ui/react-alert-dialog"));
const React = __importStar(require("react"));
const AlertDialog = AlertDialogPrimitive.Root;
exports.AlertDialog = AlertDialog;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
exports.AlertDialogTrigger = AlertDialogTrigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
exports.AlertDialogPortal = AlertDialogPortal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Overlay, { className: (0, cn_1.cn)('data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50', className), ...props, ref: ref })));
exports.AlertDialogOverlay = AlertDialogOverlay;
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsxs)(AlertDialogPortal, { children: [(0, jsx_runtime_1.jsx)(AlertDialogOverlay, {}), (0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Content, { ref: ref, className: (0, cn_1.cn)('bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] border-input fixed top-[50%] left-[50%] z-50 grid w-[calc(100vw-40px)] max-w-sm translate-x-[-50%] translate-y-[-50%] gap-6 rounded-3xl border p-6 duration-200', className), ...props })] })));
exports.AlertDialogContent = AlertDialogContent;
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex flex-col space-y-4 text-center', className), ...props }));
exports.AlertDialogHeader = AlertDialogHeader;
AlertDialogHeader.displayName = 'AlertDialogHeader';
const AlertDialogFooter = ({ className, ...props }) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className), ...props }));
exports.AlertDialogFooter = AlertDialogFooter;
AlertDialogFooter.displayName = 'AlertDialogFooter';
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Title, { ref: ref, className: (0, cn_1.cn)('text-body-large font-medium', className), ...props })));
exports.AlertDialogTitle = AlertDialogTitle;
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Description, { ref: ref, className: (0, cn_1.cn)('text-body text-muted-foreground text-left', className), ...props })));
exports.AlertDialogDescription = AlertDialogDescription;
AlertDialogDescription.displayName =
    AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Action, { ref: ref, className: (0, cn_1.cn)((0, Button_1.buttonVariants)({ variant: 'destructive' }), className), ...props })));
exports.AlertDialogAction = AlertDialogAction;
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => ((0, jsx_runtime_1.jsx)(AlertDialogPrimitive.Cancel, { ref: ref, className: (0, cn_1.cn)((0, Button_1.buttonVariants)({ variant: 'outline' }), 'mt-2 sm:mt-0', className), ...props })));
exports.AlertDialogCancel = AlertDialogCancel;
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
//# sourceMappingURL=AlertDialog.js.map