"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProtectedLayoutView;
const jsx_runtime_1 = require("react/jsx-runtime");
function ProtectedLayoutView({ bottomNav, children, sideNav, }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex h-screen flex-col overflow-hidden", children: [(0, jsx_runtime_1.jsx)("main", { className: "h-full flex-1 overflow-hidden", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex h-full", children: [(0, jsx_runtime_1.jsx)("div", { className: "hidden h-full md:block", children: sideNav }), (0, jsx_runtime_1.jsx)("div", { className: "protected-mobile-main h-full min-w-0 flex-1 overflow-hidden pb-16 md:pb-0", children: children })] }) }), bottomNav] }));
}
//# sourceMappingURL=ProtectedLayoutView.js.map