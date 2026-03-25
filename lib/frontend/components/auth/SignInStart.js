'use client';
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { publicConfig } from '@/config/public';
import { shellConfig } from '@/config/shell';
import { clientFunctionConfig } from '@/config/function/client';
import GoogleLogo from '../GoogleLogo';
import { Button } from '../ui/Button';
import { Form, FormControl, FormField, FormItem, FormMessage, } from '../ui/Form';
import { Input } from '../ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { parseAsString, useQueryState } from 'nuqs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const formSchema = z.object({ email: z.string().email() });
export default function SignInStart({ setEmail }) {
    const [_, setStep] = useQueryState('step');
    const [next] = useQueryState('next', parseAsString);
    const { mutate: createVerificationToken, isPending } = clientFunctionConfig.query.nextauthVerificationToken.useCreateOne();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '' },
    });
    function onSubmit(data) {
        const { email } = data;
        setEmail(email);
        createVerificationToken({ email }, {
            onSuccess: () => {
                setStep('2');
            },
        });
    }
    return (_jsxs("div", { className: "flex flex-col gap-5 sm:gap-6", children: [_jsxs("h3", { className: "text-center text-xl font-bold text-[var(--blue-dark-75)] sm:text-2xl", children: ["Welcome to ", publicConfig.app.name] }), _jsxs(Button, { variant: "outline", size: "lg", className: "flex h-12 w-full items-center gap-2 rounded-[12px] px-4 sm:h-11 [&_svg]:size-5", onClick: () => clientFunctionConfig.apiClient.auth.signIn('google', {
                    callbackUrl: next || shellConfig.routes.rootHref,
                }), children: [_jsx(GoogleLogo, {}), "Continue with Google"] }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 flex items-center", children: _jsx("hr", { className: "border-border w-full" }) }), _jsx("div", { className: "relative flex justify-center", children: _jsx("span", { className: "bg-background text-muted-foreground px-2 text-sm", children: "or" }) })] }), _jsx(Form, { ...form, children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-6", children: [_jsx(FormField, { control: form.control, name: "email", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormControl, { children: _jsx(Input, { ...field, scale: "lg", className: "rounded-[12px]", placeholder: "Enter your email", type: "email" }) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", size: "lg", disabled: isPending, isLoading: isPending, className: "h-12 rounded-[12px] sm:h-11", children: "Continue with Email" }), _jsxs("small", { className: "text-muted-foreground mx-auto block w-full max-w-sm text-center text-xs leading-5", children: ["Powered by ", publicConfig.app.ownerShort, ". By signing up, you agree to the", ' ', _jsx(Link, { href: shellConfig.routes.termsHref, prefetch: false, className: "underline", children: "Terms of Service" }), ' ', "and", ' ', _jsx(Link, { href: shellConfig.routes.privacyHref, prefetch: false, className: "underline", children: "Privacy Policy" }), ", including Cookie Use."] })] }) })] }));
}
//# sourceMappingURL=SignInStart.js.map