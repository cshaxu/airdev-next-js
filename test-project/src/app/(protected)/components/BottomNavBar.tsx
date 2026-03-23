'use client';

import { useRequiredCurrentUser } from '@/frontend/hooks/data/user';
import { cn } from '@/frontend/lib/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MAIN_NAV_ITEMS } from './NavConfig';
import UserButton from './UserButton';

export default function BottomNavBar() {
  const pathname = usePathname();
  useRequiredCurrentUser();
  const navItemsRef = useRef<HTMLDivElement>(null);
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    const element = navItemsRef.current;
    if (!element) {
      return;
    }

    const updateLabelVisibility = () => {
      const minTabWidthForLabel = 74;
      const tabCount = MAIN_NAV_ITEMS.length + 1;
      const shouldShow = element.clientWidth >= tabCount * minTabWidthForLabel;
      setShowLabels(shouldShow);
    };

    updateLabelVisibility();
    const observer = new ResizeObserver(updateLabelVisibility);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

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
        {MAIN_NAV_ITEMS.map((tab) => {
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
