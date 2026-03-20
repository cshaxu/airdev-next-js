'use client';

import { buttonVariants } from '@/frontend/components/ui/Button';
import { PixelResizablePanel } from '@/frontend/components/ui/PixelResizable';
import { cn } from '@/frontend/lib/cn';
import { getShellFrontendIntegration } from '@/integration/frontend/shell';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { NavItem } from './NavConfig';
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

export default function SideNavBar() {
  const pathname = usePathname();
  const lastPathRef = useRef(pathname);
  const shellIntegration = getShellFrontendIntegration();
  const navItems = shellIntegration.primaryItems.map(toNavItem);
  const shouldAutoCollapse =
    shellIntegration.shouldAutoCollapse ?? defaultCollapseMatcher;

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
            src={shellIntegration.logoSrc}
            alt={shellIntegration.logoAlt}
            width={40}
            height={40}
            className="size-10"
          />
          {!isCollapsed && (
            <span className="nav-icon text-xl font-bold">
              {shellIntegration.appName}
            </span>
          )}
        </div>

        <div className="nav-separator mx-4 h-px" />

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <SideNavLink
              key={item.to}
              label={item.label}
              to={item.to}
              icon={item.renderIcon('nav-icon size-4')}
              isFull={!isCollapsed}
              isActive={item.isActive(pathname)}
            />
          ))}
        </nav>

        <div className="flex-1" />

        <UserButton mode="sidebar" isFull={!isCollapsed} />
      </div>
    </PixelResizablePanel>
  );
}
