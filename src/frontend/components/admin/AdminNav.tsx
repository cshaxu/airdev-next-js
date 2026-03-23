'use client';

import type { AdminTabItem } from '@airdev/next/adapter/frontend/shell/types';
import HeaderBar from '@airdev/next/frontend/components/shell/HeaderBar';
import { cn } from '@airdev/next/frontend/lib/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = { tabs: AdminTabItem[] };

export default function AdminNav({ tabs }: Props) {
  const pathname = usePathname();

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
