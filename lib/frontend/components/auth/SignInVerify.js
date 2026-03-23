"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignInVerify;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("@airdev/next/frontend/components/ui/Button");
const Form_1 = require("@airdev/next/frontend/components/ui/Form");
const InputOTP_1 = require("@airdev/next/frontend/components/ui/InputOTP");
const zod_1 = require("@hookform/resolvers/zod");
const react_1 = require("next-auth/react");
const nuqs_1 = require("nuqs");
const react_2 = require("react");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
function SignInVerify({ defaultCallbackUrl, email, useCreateOneNextauthVerificationToken, verificationCodeLength, }) {
    const [next] = (0, nuqs_1.useQueryState)('next', nuqs_1.parseAsString);
    const [isSigningIn, setIsSigningIn] = (0, react_2.useState)(false);
    const { mutate: createVerificationToken, isPending: isCreatingVerificationToken, } = useCreateOneNextauthVerificationToken();
    const formSchema = (0, react_2.useMemo)(() => zod_2.z.object({
        code: zod_2.z.string().length(verificationCodeLength, {
            message: 'Please enter a valid code',
        }),
    }), [verificationCodeLength]);
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: { code: '' },
    });
    const onSubmit = (0, react_2.useCallback)(async (values) => {
        if (isSigningIn) {
            return;
        }
        setIsSigningIn(true);
        const { code } = values;
        await (0, react_1.signIn)('credentials', {
            email,
            code,
            callbackUrl: next || defaultCallbackUrl,
        })
            .catch(() => {
            form.setError('code', { message: 'Invalid code' });
        })
            .finally(() => setIsSigningIn(false));
    }, [isSigningIn, email, next, defaultCallbackUrl, form]);
    const handleComplete = (0, react_2.useCallback)((value) => {
        form.setValue('code', value);
        void form.handleSubmit(onSubmit)();
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
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-y-5 sm:gap-y-6", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-center text-xl font-bold text-[var(--blue-dark-75)] sm:text-2xl", children: "Check your email for a verification code" }), (0, jsx_runtime_1.jsx)(Form_1.Form, { ...form, children: (0, jsx_runtime_1.jsxs)("form", { className: "flex flex-col gap-y-4", onSubmit: form.handleSubmit(onSubmit), children: [(0, jsx_runtime_1.jsx)(Form_1.FormField, { control: form.control, name: "code", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(Form_1.FormItem, { className: "mb-4 flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)(Form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(InputOTP_1.InputOTP, { maxLength: verificationCodeLength, ...field, className: "mx-auto w-full justify-center", onComplete: handleComplete, children: Array.from(Array(verificationCodeLength).keys()).map((i) => ((0, jsx_runtime_1.jsx)(InputOTP_1.InputOTPGroup, { children: (0, jsx_runtime_1.jsx)(InputOTP_1.InputOTPSlot, { index: i, className: "size-11 bg-white text-base font-semibold text-black sm:size-12" }) }, i))) }) }), (0, jsx_runtime_1.jsx)(Form_1.FormMessage, {})] })) }), (0, jsx_runtime_1.jsx)(Button_1.Button, { type: "submit", size: "xl", disabled: isSigningIn, isLoading: isSigningIn, className: "h-12 rounded-[12px]", children: "Sign In" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { type: "button", variant: "link", size: "xl", disabled: isCreatingVerificationToken || form.formState.isSubmitting, onClick: resendCode, children: "Resend code" })] }) })] }));
}
//# sourceMappingURL=SignInVerify.js.map