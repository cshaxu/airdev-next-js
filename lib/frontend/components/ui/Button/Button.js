'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../../utils/cn';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { buttonVariants } from './button-variants';
const Button = React.forwardRef(({ className, variant, size, asChild = false, isLoading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (_jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref: ref, disabled: isLoading, ...props, children: isLoading ? (_jsx(Loader2, { className: "size-4 animate-spin" })) : (props.children) }));
});
Button.displayName = 'Button';
export { Button };
//# sourceMappingURL=Button.js.map