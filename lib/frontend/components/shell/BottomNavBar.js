'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clientComponentConfig } from '@/config/component/client';
import { useRequiredCurrentUser } from '../../hooks/data/user.js';
import { cn } from '../../utils/cn.js';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import UserButton from './UserButton.js';
export default function BottomNavBar() {
    const pathname = usePathname();
    const { navItems } = clientComponentConfig.NavContent();
    useRequiredCurrentUser();
    const navItemsRef = useRef(null);
    const [showLabels, setShowLabels] = useState(true);
    useEffect(() => {
        const element = navItemsRef.current;
        if (!element) {
            return;
        }
        const updateLabelVisibility = () => {
            const minTabWidthForLabel = 74;
            const tabCount = navItems.length + 1; // +1 for account tab
            const shouldShow = element.clientWidth >= tabCount * minTabWidthForLabel;
            setShowLabels(shouldShow);
        };
        updateLabelVisibility();
        const observer = new ResizeObserver(updateLabelVisibility);
        observer.observe(element);
        return () => observer.disconnect();
    }, [navItems.length]);
    return (_jsx("nav", { className: cn('mobile-bottom-nav bg-background/95 border-border fixed right-0 bottom-0 left-0 z-40 border-t backdrop-blur', 'md:hidden [@media(orientation:portrait)]:block'), style: { paddingBottom: 'max(env(safe-area-inset-bottom), 0px)' }, children: _jsxs("div", { ref: navItemsRef, className: "mx-auto flex h-16 max-w-xl items-center px-2", children: [navItems.map((item) => {
                    const active = item.isActive(pathname);
                    return (_jsxs(Link, { href: item.to, className: cn('flex flex-1 flex-col items-center gap-1 rounded-lg py-1 text-[11px] transition-colors', active ? 'text-foreground' : 'text-muted-foreground'), children: [item.renderIcon('size-5'), showLabels && (_jsx("span", { className: "whitespace-nowrap", children: item.label }))] }, item.to));
                }), _jsx(UserButton, { mode: "bottom-nav", showLabel: showLabels })] }) }));
}
//# sourceMappingURL=BottomNavBar.js.map