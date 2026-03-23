"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = GoogleLogo;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("@airdev/next/frontend/lib/cn");
function GoogleLogo({ className = '' }) {
    return ((0, jsx_runtime_1.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", className: (0, cn_1.cn)('size-16', className), children: [(0, jsx_runtime_1.jsx)("defs", { children: (0, jsx_runtime_1.jsx)("path", { id: "A", d: "M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" }) }), (0, jsx_runtime_1.jsx)("clipPath", { id: "B", children: (0, jsx_runtime_1.jsx)("use", { xlinkHref: "#A" }) }), (0, jsx_runtime_1.jsxs)("g", { transform: "matrix(.727273 0 0 .727273 -.954545 -1.45455)", children: [(0, jsx_runtime_1.jsx)("path", { d: "M0 37V11l17 13z", clipPath: "url(#B)", fill: "#fbbc05" }), (0, jsx_runtime_1.jsx)("path", { d: "M0 11l17 13 7-6.1L48 14V0H0z", clipPath: "url(#B)", fill: "#ea4335" }), (0, jsx_runtime_1.jsx)("path", { d: "M0 37l30-23 7.9 1L48 0v48H0z", clipPath: "url(#B)", fill: "#34a853" }), (0, jsx_runtime_1.jsx)("path", { d: "M48 48L17 24l-4-3 35-10z", clipPath: "url(#B)", fill: "#4285f4" })] })] }));
}
//# sourceMappingURL=GoogleLogo.js.map