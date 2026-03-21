'use client';

import { shellAdapter } from '@/adapter/frontend/shell';
import { useRequiredCurrentUser } from '@/frontend/hooks/data/user';
import { cn } from '@/frontend/lib/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import UserButton from './UserButton';

export default function BottomNavBar() {
  const pathname = usePathname();
  useRequiredCurrentUser();
  const navItemsRef = useRef<HTMLDivElement>(null);
  const [showLabels, setShowLabels] = useState(true);
  const navItems = shellAdapter.navigation.primaryItems;

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
        {navItems.map((item) => {
          const isActive = item.match
            ? item.match(pathname)
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 rounded-lg py-1 text-[11px] transition-colors',
                isActive ? 'text-foreground' : 'text-muted-foreground'
              )}
            >
              {item.renderIcon('size-5')}
              {showLabels && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          );
        })}
        <UserButton mode="bottom-nav" showLabel={showLabels} />
      </div>
    </nav>
  );
}
