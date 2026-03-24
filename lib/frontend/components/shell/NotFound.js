import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../ui/Button';
import Link from 'next/link';
export default function NotFound() {
    return (_jsx("main", { className: "flex min-h-screen items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-4xl font-bold", children: "404" }), _jsx("h2", { className: "mt-4 text-2xl font-semibold", children: "Page Not Found" }), _jsx("p", { className: "text-muted-foreground mt-2", children: "The page you are looking for does not exist." }), _jsx(Button, { asChild: true, className: "mt-6", children: _jsx(Link, { href: "/", children: "Go Home" }) })] }) }));
}
//# sourceMappingURL=NotFound.js.map