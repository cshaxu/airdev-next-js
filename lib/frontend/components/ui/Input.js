'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../utils/cn';
import { cva } from 'class-variance-authority';
import * as React from 'react';
export const inputVariants = cva(cn('flex w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background', 'placeholder:text-muted-foreground', 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-ring', 'disabled:cursor-not-allowed disabled:opacity-50', 'file:border-0 file:bg-transparent file:text-sm file:font-medium', 'transition-colors hover:border-neutral-400 dark:hover:border-neutral-500'), {
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
    return (_jsx("input", { type: type, className: cn(inputVariants({ scale }), className), ref: ref, ...props }));
});
Input.displayName = 'Input';
export { Input };
//# sourceMappingURL=Input.js.map