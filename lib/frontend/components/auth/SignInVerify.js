'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clientFunctionConfig } from '@/config/function/client';
import { Button } from '../ui/Button.js';
import { Form, FormControl, FormField, FormItem, FormMessage, } from '../ui/Form.js';
import { InputOTP, InputOTPGroup, InputOTPSlot, } from '../ui/InputOTP.js';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseAsString, useQueryState } from 'nuqs';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const formSchema = z.object({
    code: z.string().length(5, { message: 'Please enter a valid code' }),
});
export default function SignInVerify({ email }) {
    const [next] = useQueryState('next', parseAsString);
    const [isSigningIn, setIsSigningIn] = useState(false);
    const { mutate: createVerificationToken, isPending: isCreatingVerificationToken, } = clientFunctionConfig.query.nextauthVerificationToken.useCreateOne();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { code: '' },
    });
    const onSubmit = useCallback(async (values) => {
        if (isSigningIn) {
            return;
        }
        setIsSigningIn(true);
        const { code } = values;
        await clientFunctionConfig.apiClient.auth
            .signIn('credentials', { email, code, callbackUrl: next || '/' })
            .catch(() => {
            form.setError('code', { message: 'Invalid code' });
        })
            .finally(() => setIsSigningIn(false));
    }, [email, next, isSigningIn, form]);
    const handleComplete = useCallback((value) => {
        form.setValue('code', value);
        form.handleSubmit(onSubmit)();
    }, [form, onSubmit]);
    const resendCode = () => {
        if (isCreatingVerificationToken) {
            return;
        }
        createVerificationToken({ email }, {
            onSuccess: () => {
                form.reset({ code: undefined });
            },
        });
    };
    return (_jsxs("div", { className: "flex flex-col gap-y-5 sm:gap-y-6", children: [_jsx("p", { className: "text-center text-xl font-bold text-[var(--blue-dark-75)] sm:text-2xl", children: "Check your email for a verification code" }), _jsx(Form, { ...form, children: _jsxs("form", { className: "flex flex-col gap-y-4", onSubmit: form.handleSubmit(onSubmit), children: [_jsx(FormField, { control: form.control, name: "code", render: ({ field }) => (_jsxs(FormItem, { className: "mb-4 flex flex-col items-center", children: [_jsx(FormControl, { children: _jsx(InputOTP, { maxLength: 5, ...field, className: "mx-auto w-full justify-center", onComplete: handleComplete, children: Array.from(Array(5).keys()).map((i) => (_jsx(InputOTPGroup, { children: _jsx(InputOTPSlot, { index: i, className: "size-11 bg-white text-base font-semibold text-black sm:size-12" }) }, i))) }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", size: "xl", disabled: isSigningIn, isLoading: isSigningIn, className: "h-12 rounded-[12px]", children: "Sign In" }), _jsx(Button, { type: "button", variant: "link", size: "xl", disabled: isCreatingVerificationToken || form.formState.isSubmitting, onClick: resendCode, children: "Resend code" })] }) })] }));
}
//# sourceMappingURL=SignInVerify.js.map