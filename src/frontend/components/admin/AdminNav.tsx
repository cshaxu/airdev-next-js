'use client';

import { ADMIN_API_HREF, ADMIN_USERS_HREF } from '@/common/constant';
import { shellConfig } from '@/config/shell';
import HeaderBar from '@/frontend/components/shell/HeaderBar';
import { cn } from '@/frontend/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type AdminTab = { href: string; label: string };

export default function AdminNav() {
  const pathname = usePathname();
  const adminTabs: AdminTab[] = [
    { label: 'API', href: ADMIN_API_HREF },
    { label: 'Users', href: ADMIN_USERS_HREF },
    ...shellConfig.adminTabs,
  ];

  return (
    <HeaderBar>
      <div className="flex gap-1">
        {adminTabs.map((tab) => (
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
