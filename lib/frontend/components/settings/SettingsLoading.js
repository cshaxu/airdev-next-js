import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import HeaderBar from '../shell/HeaderBar';
export default function SettingsLoading() {
    return (_jsxs("div", { className: "flex h-full flex-col overflow-hidden", children: [_jsx(HeaderBar, { isLoading: true }), _jsx("div", { className: "min-h-0 flex-1 overflow-hidden", children: _jsx("div", { className: "size-full overflow-y-auto p-6", children: _jsx("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4", children: Array.from({ length: 3 }).map((_, i) => (_jsx("div", { className: "bg-muted h-[92px] animate-pulse rounded-xl" }, i))) }) }) })] }));
}
//# sourceMappingURL=SettingsLoading.js.map