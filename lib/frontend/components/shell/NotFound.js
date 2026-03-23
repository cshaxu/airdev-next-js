"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotFound;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("@airdev/next/frontend/components/ui/Button");
const link_1 = __importDefault(require("next/link"));
function NotFound() {
    return ((0, jsx_runtime_1.jsx)("main", { className: "flex min-h-screen items-center justify-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "text-center", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-4xl font-bold", children: "404" }), (0, jsx_runtime_1.jsx)("h2", { className: "mt-4 text-2xl font-semibold", children: "Page Not Found" }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground mt-2", children: "The page you are looking for does not exist." }), (0, jsx_runtime_1.jsx)(Button_1.Button, { asChild: true, className: "mt-6", children: (0, jsx_runtime_1.jsx)(link_1.default, { href: "/", children: "Go Home" }) })] }) }));
}
//# sourceMappingURL=NotFound.js.map