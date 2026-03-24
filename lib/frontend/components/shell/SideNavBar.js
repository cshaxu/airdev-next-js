'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clientComponentConfig } from '@/config/component/client';
import { publicConfig } from '@/config/public';
import { buttonVariants } from '../ui/Button';
import { PixelResizablePanel } from '../ui/PixelResizable';
import { cn } from '../../utils/cn';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import UserButton from './UserButton';
const adminRegex = /^\/admin(?:\/.*)?$/;
function SideNavLink({ label, icon, to, isFull, isActive }) {
    return (_jsxs(Link, { href: to, className: cn(buttonVariants({ variant: 'ghost' }), isFull ? 'rounded-xl' : 'rounded-full', 'p-2', 'nav-text', 'hover:bg-[var(--nav-hover)]', isActive && 'nav-active', isFull ? 'justify-start' : 'justify-center'), title: isFull ? undefined : label, children: [icon, isFull && _jsx("span", { className: "ml-2", children: label })] }));
}
export default function SideNavBar() {
    const pathname = usePathname();
    const lastPathRef = useRef(pathname);
    const { navItems } = clientComponentConfig.NavContent();
    const shouldCollapse = Boolean(pathname.match(adminRegex) // || pathname.match(adminRegex)
    );
    const [isCollapsed, setIsCollapsed] = useState(shouldCollapse);
    // 监听路由变化，更新状态
    useEffect(() => {
        const wasCollapsePage = Boolean(lastPathRef.current.match(adminRegex)
        // || lastPathRef.current.match(adminRegex)
        );
        const isCollapsePage = Boolean(pathname.match(adminRegex) // || pathname.match(adminRegex)
        );
        // 只有在进入或离开最小化页面时才调整状态
        if (wasCollapsePage !== isCollapsePage) {
            setIsCollapsed(isCollapsePage);
        }
        lastPathRef.current = pathname;
    }, [pathname]);
    return (_jsx(PixelResizablePanel, { collapsedSize: 56, minSize: 200, maxSize: 480, defaultSize: 240, isCollapsed: isCollapsed, onCollapseChange: setIsCollapsed, children: _jsxs("div", { className: "nav-bg flex h-full flex-col gap-4 overflow-y-auto px-2 py-4", children: [_jsxs("div", { className: cn('flex items-center', !isCollapsed ? 'gap-2' : 'justify-center'), children: [_jsx(Image, { src: "/logo.png", alt: "Logo", width: 40, height: 40, className: "size-10" }), !isCollapsed && (_jsx("span", { className: "nav-icon text-xl font-bold", children: publicConfig.app.name }))] }), _jsx("div", { className: "nav-separator mx-4 h-px" }), _jsx("nav", { className: "flex flex-col gap-1", children: navItems.map((item) => (_jsx(SideNavLink, { label: item.label, to: item.to, icon: item.renderIcon('nav-icon size-4'), isFull: !isCollapsed, isActive: item.isActive(pathname) }, item.to))) }), _jsx("div", { className: "flex-1" }), _jsx(UserButton, { mode: "sidebar", isFull: !isCollapsed })] }) }));
}
//# sourceMappingURL=SideNavBar.js.map