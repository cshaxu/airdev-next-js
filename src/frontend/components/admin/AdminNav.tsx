'use client';

import { shellConfig } from '@/config/shell';
import HeaderBar from '@/package/frontend/components/shell/HeaderBar';
import { cn } from '@/package/frontend/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type AdminTab = {
  href: string;
  label: string;
};

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <HeaderBar>
      <div className="flex gap-1">
        {(shellConfig.adminTabs as AdminTab[]).map((tab: AdminTab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
              pathname === tab.href || pathname.startsWith(tab.href + '/')
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </HeaderBar>
  );
}
