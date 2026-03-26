import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../utils/cn.js';
export function Skeleton({ className, ...props }) {
    return (_jsx("div", { "data-slot": "skeleton", className: cn('bg-accent animate-pulse rounded-md', className), ...props }));
}
//# sourceMappingURL=Skeleton.js.map