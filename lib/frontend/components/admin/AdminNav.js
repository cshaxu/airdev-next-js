'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { shellConfig } from '@/config/shell';
import HeaderBar from '../shell/HeaderBar';
import { cn } from '../../utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export default function AdminNav() {
    const pathname = usePathname();
    return (_jsx(HeaderBar, { children: _jsx("div", { className: "flex gap-1", children: shellConfig.adminTabs.map((tab) => (_jsx(Link, { href: tab.href, className: cn('rounded-md px-3 py-1.5 text-sm font-medium transition-colors', pathname === tab.href || pathname.startsWith(tab.href + '/')
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'), children: tab.label }, tab.href))) }) }));
}
//# sourceMappingURL=AdminNav.js.map