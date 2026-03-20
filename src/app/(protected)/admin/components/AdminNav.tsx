'use client';

import HeaderBar from '@/frontend/components/HeaderBar';
import { cn } from '@/frontend/lib/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Users', href: '/admin/users' },
  { label: 'API', href: '/admin/api' },
  { label: 'Admin Test', href: '/admin/test' },
];

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <HeaderBar>
      <div className="flex gap-1">
        {tabs.map((tab) => (
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
