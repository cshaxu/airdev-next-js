'use client';

import { APP_NAME } from '@/common/config';
import { buttonVariants } from '@/frontend/components/ui/Button';
import { PixelResizablePanel } from '@/frontend/components/ui/PixelResizable';
import { cn } from '@/frontend/lib/cn';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MAIN_NAV_ITEMS } from './NavConfig';
import UserButton from './UserButton';

const adminRegex = /^\/admin(?:\/.*)?$/;

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

  const shouldCollapse = Boolean(pathname.match(adminRegex));
  const [isCollapsed, setIsCollapsed] = useState(shouldCollapse);

  useEffect(() => {
    const wasCollapsePage = Boolean(lastPathRef.current.match(adminRegex));
    const isCollapsePage = Boolean(pathname.match(adminRegex));

    if (wasCollapsePage !== isCollapsePage) {
      setIsCollapsed(isCollapsePage);
    }

    lastPathRef.current = pathname;
  }, [pathname]);

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
            src="/logo.png"
            alt="Logo"
            width={40}
            height={40}
            className="size-10"
          />
          {!isCollapsed && (
            <span className="nav-icon text-xl font-bold">{APP_NAME}</span>
          )}
        </div>

        <div className="nav-separator mx-4 h-px" />

        <nav className="flex flex-col gap-1">
          {MAIN_NAV_ITEMS.map((item) => (
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
