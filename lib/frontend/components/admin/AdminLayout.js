import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { shellConfig } from '@/config/shell';
import { getRealCurrentUser } from '../../../backend/lib/framework';
import { initializePermission } from '../../initializePermission';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import AdminNav from './AdminNav';
export default async function AdminLayout({ children }) {
    const queryClient = new QueryClient();
    await initializePermission(queryClient);
    const realCurrentUser = await getRealCurrentUser();
    if (!realCurrentUser?.isAdmin) {
        return redirect(shellConfig.routes.rootHref);
    }
    return (_jsxs("div", { className: "flex h-full flex-col overflow-hidden", children: [_jsx(AdminNav, {}), _jsx("div", { className: "min-h-0 flex-1 overflow-hidden", children: _jsx("div", { className: "size-full overflow-y-auto p-6", children: children }) })] }));
}
//# sourceMappingURL=AdminLayout.js.map