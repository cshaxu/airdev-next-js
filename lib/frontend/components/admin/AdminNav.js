'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ADMIN_API_HREF, ADMIN_USERS_HREF } from '../../../common/constant.js';
import { publicConfig } from '@/config/public';
import HeaderBar from '../shell/HeaderBar.js';
import { cn } from '../../utils/cn.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function AdminNav() {
    const pathname = usePathname();
    const adminTabs = [
        { label: 'API', href: ADMIN_API_HREF },
        { label: 'Users', href: ADMIN_USERS_HREF },
        ...publicConfig.shell.adminTabs,
    ];
    return (_jsx(HeaderBar, { children: _jsx("div", { className: "flex gap-1", children: adminTabs.map((tab) => (_jsx(Link, { href: tab.href, className: cn('rounded-md px-3 py-1.5 text-sm font-medium transition-colors', pathname === tab.href || pathname.startsWith(tab.href + '/')
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'), children: tab.label }, tab.href))) }) }));
}
//# sourceMappingURL=AdminNav.js.map