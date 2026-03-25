'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../utils/cn.js';
import { OTPInput, OTPInputContext } from 'input-otp';
import { Minus } from 'lucide-react';
import * as React from 'react';
const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => (_jsx(OTPInput, { ref: ref, containerClassName: cn('flex items-center gap-4 has-[:disabled]:opacity-50', containerClassName), className: cn('disabled:cursor-not-allowed', className), ...props })));
InputOTP.displayName = 'InputOTP';
const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, className: cn('flex items-center', className), ...props })));
InputOTPGroup.displayName = 'InputOTPGroup';
const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
    return (_jsxs("div", { ref: ref, className: cn('border-input relative flex size-9 items-center justify-center border-y border-r text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md', isActive && 'ring-ring z-10 ring-1', className), ...props, children: [char, hasFakeCaret && (_jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: _jsx("div", { className: "animate-caret-blink bg-foreground h-4 w-px duration-1000" }) }))] }));
});
InputOTPSlot.displayName = 'InputOTPSlot';
const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (_jsx("div", { ref: ref, role: "separator", ...props, children: _jsx(Minus, {}) })));
InputOTPSeparator.displayName = 'InputOTPSeparator';
export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
//# sourceMappingURL=InputOTP.js.map