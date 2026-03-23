"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignInStart;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("@airdev/next/frontend/components/ui/Button");
const Form_1 = require("@airdev/next/frontend/components/ui/Form");
const Input_1 = require("@airdev/next/frontend/components/ui/Input");
const zod_1 = require("@hookform/resolvers/zod");
const react_1 = require("next-auth/react");
const link_1 = __importDefault(require("next/link"));
const nuqs_1 = require("nuqs");
const react_hook_form_1 = require("react-hook-form");
const zod_2 = require("zod");
const GoogleLogo_1 = __importDefault(require("./GoogleLogo"));
const formSchema = zod_2.z.object({ email: zod_2.z.string().email() });
function SignInStart({ appName, homeHref, ownerShort, privacyHref, setEmail, termsHref, useCreateOneNextauthVerificationToken, }) {
    const [_, setStep] = (0, nuqs_1.useQueryState)('step');
    const [next] = (0, nuqs_1.useQueryState)('next', nuqs_1.parseAsString);
    const { mutate: createVerificationToken, isPending } = useCreateOneNextauthVerificationToken();
    const form = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_1.zodResolver)(formSchema),
        defaultValues: { email: '' },
    });
    function onSubmit(data) {
        const { email } = data;
        setEmail(email);
        createVerificationToken({ email }, {
            onSuccess: () => {
                void setStep('2');
            },
        });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-5 sm:gap-6", children: [(0, jsx_runtime_1.jsxs)("h3", { className: "text-center text-xl font-bold text-[var(--blue-dark-75)] sm:text-2xl", children: ["Welcome to ", appName] }), (0, jsx_runtime_1.jsxs)(Button_1.Button, { variant: "outline", size: "lg", className: "flex h-12 w-full items-center gap-2 rounded-[12px] px-4 sm:h-11 [&_svg]:size-5", onClick: () => void (0, react_1.signIn)('google', {
                    callbackUrl: next || homeHref,
                }), type: "button", children: [(0, jsx_runtime_1.jsx)(GoogleLogo_1.default, {}), "Continue with Google"] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center", children: (0, jsx_runtime_1.jsx)("hr", { className: "border-border w-full" }) }), (0, jsx_runtime_1.jsx)("div", { className: "relative flex justify-center", children: (0, jsx_runtime_1.jsx)("span", { className: "bg-background text-muted-foreground px-2 text-sm", children: "or" }) })] }), (0, jsx_runtime_1.jsx)(Form_1.Form, { ...form, children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col gap-6", children: [(0, jsx_runtime_1.jsx)(Form_1.FormField, { control: form.control, name: "email", render: ({ field }) => ((0, jsx_runtime_1.jsxs)(Form_1.FormItem, { children: [(0, jsx_runtime_1.jsx)(Form_1.FormControl, { children: (0, jsx_runtime_1.jsx)(Input_1.Input, { ...field, scale: "lg", className: "rounded-[12px]", placeholder: "Enter your email", type: "email" }) }), (0, jsx_runtime_1.jsx)(Form_1.FormMessage, {})] })) }), (0, jsx_runtime_1.jsx)(Button_1.Button, { type: "submit", size: "lg", disabled: isPending, isLoading: isPending, className: "h-12 rounded-[12px] sm:h-11", children: "Continue with Email" }), (0, jsx_runtime_1.jsxs)("small", { className: "text-muted-foreground mx-auto block w-full max-w-sm text-center text-xs leading-5", children: ["Powered by ", ownerShort, ". By signing up, you agree to the", ' ', (0, jsx_runtime_1.jsx)(link_1.default, { href: termsHref, prefetch: false, className: "underline", children: "Terms of Service" }), ' ', "and", ' ', (0, jsx_runtime_1.jsx)(link_1.default, { href: privacyHref, prefetch: false, className: "underline", children: "Privacy Policy" }), ", including Cookie Use."] })] }) })] }));
}
//# sourceMappingURL=SignInStart.js.map