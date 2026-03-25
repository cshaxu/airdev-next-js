import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { withError } from '../../utils/page.js';
async function Page() {
    return (_jsx("div", { className: "flex h-full items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Admin Tools" }), _jsx("p", { className: "text-muted-foreground mt-2", children: "Select an option from the header bar to get started" })] }) }));
}
const SafePage = withError(Page);
export default SafePage;
//# sourceMappingURL=AdminPage.js.map