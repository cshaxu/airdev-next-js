'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../utils/cn.js';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import * as React from 'react';
const labelVariants = cva('text-sm font-medium text-muted-foreground leading-6 mb-1.5 peer-disabled:cursor-not-allowed peer-disabled:opacity-70');
const Label = React.forwardRef(({ className, ...props }, ref) => (_jsx(LabelPrimitive.Root, { ref: ref, className: cn(labelVariants(), className), ...props })));
Label.displayName = LabelPrimitive.Root.displayName;
export { Label };
//# sourceMappingURL=Label.js.map