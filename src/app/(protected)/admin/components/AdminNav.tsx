'use client';

import HeaderBar from '@/frontend/components/HeaderBar';
import { cn } from '@/frontend/lib/cn';
import { getAdminFrontendIntegration } from '@/integration/frontend/admin';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();
  const { tabs } = getAdminFrontendIntegration();

  return (
    <HeaderBar>
      <div className="flex gap-1">
        {tabs.map((tab) => {
          const isActive = tab.match
            ? tab.match(pathname)
            : pathname === tab.href || pathname.startsWith(`${tab.href}/`);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </HeaderBar>
  );
}
