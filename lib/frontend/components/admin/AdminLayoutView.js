"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminLayoutView;
const jsx_runtime_1 = require("react/jsx-runtime");
const AdminNav_1 = __importDefault(require("@airdev/next/frontend/components/admin/AdminNav"));
function AdminLayoutView({ children, tabs }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex h-full flex-col overflow-hidden", children: [(0, jsx_runtime_1.jsx)(AdminNav_1.default, { tabs: tabs }), (0, jsx_runtime_1.jsx)("div", { className: "min-h-0 flex-1 overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "size-full overflow-y-auto p-6", children: children }) })] }));
}
//# sourceMappingURL=AdminLayoutView.js.map