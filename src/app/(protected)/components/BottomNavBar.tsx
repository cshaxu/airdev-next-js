'use client';

import { useCurrentUserRequired } from '@/frontend/hooks/data/user';
import { cn } from '@/frontend/lib/cn';
import { getShellFrontendIntegration } from '@/integration/frontend/shell';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { NavItem } from './NavConfig';
import UserButton from './UserButton';

function toNavItem(item: {
  href: string;
  key: string;
  label: string;
  match?: (pathname: string) => boolean;
  renderIcon: (className: string) => React.ReactNode;
}): NavItem {
  return {
    key: item.key,
    label: item.label,
    to: item.href,
    isActive:
      item.match ??
      ((pathname) =>
        pathname === item.href || pathname.startsWith(`${item.href}/`)),
    renderIcon: item.renderIcon,
  };
}

export default function BottomNavBar() {
  const pathname = usePathname();
  useCurrentUserRequired();
  const navItemsRef = useRef<HTMLDivElement>(null);
  const [showLabels, setShowLabels] = useState(true);
  const navItems = getShellFrontendIntegration().primaryItems.map(toNavItem);

  useEffect(() => {
    const element = navItemsRef.current;
    if (!element) {
      return;
    }

    const updateLabelVisibility = () => {
      const minTabWidthForLabel = 74;
      const tabCount = navItems.length + 1;
      const shouldShow = element.clientWidth >= tabCount * minTabWidthForLabel;
      setShowLabels(shouldShow);
    };

    updateLabelVisibility();
    const observer = new ResizeObserver(updateLabelVisibility);
    observer.observe(element);
    return () => observer.disconnect();
  }, [navItems.length]);

  return (
    <nav
      className={cn(
        'mobile-bottom-nav bg-background/95 border-border fixed right-0 bottom-0 left-0 z-40 border-t backdrop-blur',
        'md:hidden [@media(orientation:portrait)]:block'
      )}
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 0px)' }}
    >
      <div
        ref={navItemsRef}
        className="mx-auto flex h-16 max-w-xl items-center px-2"
      >
        {navItems.map((tab) => {
          const active = tab.isActive(pathname);
          return (
            <Link
              key={tab.to}
              href={tab.to}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 rounded-lg py-1 text-[11px] transition-colors',
                active ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {tab.renderIcon('size-5')}
              {showLabels && (
                <span className="whitespace-nowrap">{tab.label}</span>
              )}
            </Link>
          );
        })}
        <UserButton mode="bottom-nav" showLabel={showLabels} />
      </div>
    </nav>
  );
}
