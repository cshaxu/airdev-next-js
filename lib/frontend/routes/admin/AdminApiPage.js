"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const shell_1 = require("@airdev/next/adapter/frontend/shell");
const page_1 = require("@airdev/next/frontend/utils/page");
function AdminApiPage() {
    const { AirentApiNextStudioComponent } = shell_1.shellAdapter.component;
    return (0, jsx_runtime_1.jsx)(AirentApiNextStudioComponent, {});
}
const SafeAdminApiPage = (0, page_1.withError)(AdminApiPage);
exports.default = SafeAdminApiPage;
//# sourceMappingURL=AdminApiPage.js.map