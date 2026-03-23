"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AdminPageView_1 = __importDefault(require("@airdev/next/frontend/components/admin/AdminPageView"));
const page_1 = require("@airdev/next/frontend/utils/page");
async function AdminPage() {
    return (0, jsx_runtime_1.jsx)(AdminPageView_1.default, {});
}
const SafeAdminPage = (0, page_1.withError)(AdminPage);
exports.default = SafeAdminPage;
//# sourceMappingURL=AdminPage.js.map