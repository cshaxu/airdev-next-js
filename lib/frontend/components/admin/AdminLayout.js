import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getRealCurrentUser } from '../../../backend/lib/framework.js';
import { ROOT_HREF } from '../../../common/constant.js';
import { initializePermission } from '../../initializePermission.js';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import AdminNav from './AdminNav.js';
export default async function AdminLayout({ children }) {
    const queryClient = new QueryClient();
    await initializePermission(queryClient);
    const realCurrentUser = await getRealCurrentUser();
    if (!realCurrentUser?.isAdmin) {
        return redirect(ROOT_HREF);
    }
    return (_jsxs("div", { className: "flex h-full flex-col overflow-hidden", children: [_jsx(AdminNav, {}), _jsx("div", { className: "min-h-0 flex-1 overflow-hidden", children: _jsx("div", { className: "size-full overflow-y-auto p-6", children: children }) })] }));
}
//# sourceMappingURL=AdminLayout.js.map