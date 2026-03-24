'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../ui/Button';
import Link from 'next/link';
import { parseAsString, useQueryState } from 'nuqs';
function ErrorPage() {
    const [error] = useQueryState('error', parseAsString);
    const isVerificationError = error === 'Verification';
    return (_jsx("main", { className: "flex min-h-screen items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold", children: "401" }), _jsx("h2", { className: "mt-4 text-2xl font-semibold", children: "Unable to sign in" }), _jsx("p", { className: "text-muted-foreground mt-2 max-w-md", children: isVerificationError
                        ? 'The verification code is no longer valid. It may have already been used or expired. Please request a new code.'
                        : 'Something went wrong while signing you in. Please try again later.' }), _jsx(Button, { asChild: true, className: "mt-6", children: _jsx(Link, { href: "/auth/signin", children: "Try Again" }) })] }) }));
}
export default ErrorPage;
//# sourceMappingURL=ErrorPage.js.map