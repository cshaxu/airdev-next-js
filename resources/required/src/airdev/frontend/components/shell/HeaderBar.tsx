/* "@airdev/next": "managed" */

'use client';

import { airdevPublicConfig } from '@/airdev/config/public';
import { ResponsiveBreadcrumb } from '@/airdev/frontend/components/ui/ResponsiveBreadcrumb';
import { Home } from 'lucide-react';
import { createElement } from 'react';
import TranslateButton from './TranslateButton';

export type HeaderBarItem = {
  label: string;
  href?: string;
  icon?: React.ReactNode;
};

type Props = React.PropsWithChildren<{
  items?: HeaderBarItem[];
  isLoading?: boolean;
}>;

export default function HeaderBar({
  children,
  items,
  isLoading = false,
}: Props) {
  if (isLoading) {
    return (
      <div className="header-bg dark:bg-background/80 flex h-12 w-full items-center px-6 backdrop-blur-lg" />
    );
  }

  const fullItems: HeaderBarItem[] = [
    {
      label: '',
      href: airdevPublicConfig.shell.routes.homeHref,
      icon: createElement(Home, { className: 'size-4' }),
    },
    ...(items ?? []),
  ];

  return (
    <div className="header-bg dark:bg-background/80 flex h-12 w-full items-center px-6 backdrop-blur-lg">
      {/* Left: Breadcrumbs */}
      {fullItems.length && (
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="min-w-[36px] flex-shrink flex-grow basis-0">
            <ResponsiveBreadcrumb
              items={fullItems}
              renderItem={(item) =>
                item.icon ? (
                  <span className="text-muted-foreground hover:text-foreground">
                    {item.icon}
                  </span>
                ) : (
                  item.label
                )
              }
            />
          </div>
        </div>
      )}

      {/* Center: Tabs */}
      {children}

      {/* Right: Actions */}
      <div className="flex flex-1 items-center justify-end space-x-4 pl-8">
        <TranslateButton />
      </div>
    </div>
  );
}
