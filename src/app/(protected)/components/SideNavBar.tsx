'use client';

import { shellAdapter } from '@airdev/next/adapter/frontend/shell';
import { publicConfig } from '@airdev/next/common/config';
import { buttonVariants } from '@airdev/next/frontend/components/ui/Button';
import { PixelResizablePanel } from '@airdev/next/frontend/components/ui/PixelResizable';
import { cn } from '@airdev/next/frontend/lib/cn';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import UserButton from './UserButton';

const defaultCollapseMatcher = (pathname: string) =>
  pathname.startsWith('/admin');

type SideNavLinkProps = {
  label: string;
  icon: React.ReactNode;
  to: string;
  isFull: boolean;
  isActive: boolean;
};

function SideNavLink({ label, icon, to, isFull, isActive }: SideNavLinkProps) {
  return (
    <Link
      href={to}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        isFull ? 'rounded-xl' : 'rounded-full',
        'p-2',
        'nav-text',
        'hover:bg-[var(--nav-hover)]',
        isActive && 'nav-active',
        isFull ? 'justify-start' : 'justify-center'
      )}
      title={isFull ? undefined : label}
    >
      {icon}
      {isFull && <span className="ml-2">{label}</span>}
    </Link>
  );
}

export default function SideNavBar() {
  const pathname = usePathname();
  const lastPathRef = useRef(pathname);
  const navItems = shellAdapter.navigation.primaryItems;
  const shouldAutoCollapse =
    shellAdapter.navigation.shouldAutoCollapse ?? defaultCollapseMatcher;

  const shouldCollapse = shouldAutoCollapse(pathname);
  const [isCollapsed, setIsCollapsed] = useState(shouldCollapse);

  useEffect(() => {
    const wasCollapsePage = shouldAutoCollapse(lastPathRef.current);
    const isCollapsePage = shouldAutoCollapse(pathname);

    if (wasCollapsePage !== isCollapsePage) {
      setIsCollapsed(isCollapsePage);
    }

    lastPathRef.current = pathname;
  }, [pathname, shouldAutoCollapse]);

  return (
    <PixelResizablePanel
      collapsedSize={56}
      minSize={200}
      maxSize={480}
      defaultSize={240}
      isCollapsed={isCollapsed}
      onCollapseChange={setIsCollapsed}
    >
      <div className="nav-bg flex h-full flex-col gap-4 overflow-y-auto px-2 py-4">
        <div
          className={cn(
            'flex items-center',
            !isCollapsed ? 'gap-2' : 'justify-center'
          )}
        >
          <Image
            src={shellAdapter.component.logoSrc}
            alt="Logo"
            width={40}
            height={40}
            className="size-10"
          />
          {!isCollapsed && (
            <span className="nav-icon text-xl font-bold">
              {publicConfig.app.name}
            </span>
          )}
        </div>

        <div className="nav-separator mx-4 h-px" />

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = item.match
              ? item.match(pathname)
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <SideNavLink
                key={item.href}
                label={item.label}
                to={item.href}
                icon={item.renderIcon('nav-icon size-4')}
                isFull={!isCollapsed}
                isActive={isActive}
              />
            );
          })}
        </nav>

        <div className="flex-1" />

        <UserButton mode="sidebar" isFull={!isCollapsed} />
      </div>
    </PixelResizablePanel>
  );
}
