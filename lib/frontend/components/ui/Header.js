"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
const jsx_runtime_1 = require("react/jsx-runtime");
function Header({ title, children }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "sticky top-0 z-10 -mx-6 mb-5 flex items-center justify-between bg-white px-6 pt-5 pb-2", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-2xl font-bold", children: title }), children] }));
}
//# sourceMappingURL=Header.js.map