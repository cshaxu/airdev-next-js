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
exports.Input = exports.inputVariants = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("@airdev/next/frontend/lib/cn");
const class_variance_authority_1 = require("class-variance-authority");
const React = __importStar(require("react"));
exports.inputVariants = (0, class_variance_authority_1.cva)((0, cn_1.cn)('flex w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background', 'placeholder:text-muted-foreground', 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring', 'disabled:cursor-not-allowed disabled:opacity-50', 'file:border-0 file:bg-transparent file:text-sm file:font-medium', 'transition-colors hover:border-neutral-400 dark:hover:border-neutral-500'), {
    variants: {
        scale: {
            default: 'h-10',
            sm: 'h-9 px-2 text-xs',
            lg: 'h-11 px-4 text-base',
            compact: 'h-8 px-2 rounded-sm',
        },
    },
    defaultVariants: {
        scale: 'default',
    },
});
const Input = React.forwardRef(({ className, type, scale, ...props }, ref) => {
    return ((0, jsx_runtime_1.jsx)("input", { type: type, className: (0, cn_1.cn)((0, exports.inputVariants)({ scale }), className), ref: ref, ...props }));
});
exports.Input = Input;
Input.displayName = 'Input';
//# sourceMappingURL=Input.js.map