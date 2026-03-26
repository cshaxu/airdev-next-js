import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import HeaderBar from '../shell/HeaderBar.js';
import { Skeleton } from '../ui/Skeleton.js';
export default function SettingsLoading() {
    return (_jsxs("div", { className: "flex h-full flex-col overflow-hidden", children: [_jsx(HeaderBar, { isLoading: true }), _jsx("div", { className: "min-h-0 flex-1 overflow-hidden", children: _jsx("div", { className: "size-full overflow-y-auto p-6", children: _jsx("div", { className: "grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4", children: Array.from({ length: 3 }).map((_, i) => (_jsxs("div", { className: "space-y-4 rounded-2xl border p-5 shadow-sm", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Skeleton, { className: "size-16 rounded-full" }), _jsxs("div", { className: "min-w-0 flex-1 space-y-3", children: [_jsx(Skeleton, { className: "h-5 w-36" }), _jsx(Skeleton, { className: "h-4 w-48" })] })] }), _jsx(Skeleton, { className: "h-9 w-24" })] }, i))) }) }) })] }));
}
//# sourceMappingURL=SettingsLoading.js.map