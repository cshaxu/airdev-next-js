"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoadingPageView;
const jsx_runtime_1 = require("react/jsx-runtime");
const lucide_react_1 = require("lucide-react");
function LoadingPageView() {
    return ((0, jsx_runtime_1.jsx)("div", { className: "grid h-screen w-full place-items-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "size-4 animate-spin" }) }));
}
//# sourceMappingURL=LoadingPageView.js.map