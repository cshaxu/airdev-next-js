'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { logInfo } from '@airent/api';
import { useEffect } from 'react';
export default function RootError({ error }) {
    useEffect(() => logInfo(error), [error]);
    return (_jsx("div", { className: "flex h-screen flex-col items-center justify-center", children: _jsx("h2", { className: "py-4", children: "An error has occurred!" }) }));
}
//# sourceMappingURL=RootError.js.map