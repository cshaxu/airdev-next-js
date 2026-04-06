/* "@airdev/next": "managed" */

'use client';

import { airdevPublicConfig } from '@/airdev/config/public';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/airdev/frontend/components/ui/DropdownMenu';
import {
  type BreadcrumbItem,
  ResponsiveBreadcrumb,
} from '@/airdev/frontend/components/ui/ResponsiveBreadcrumb';
import TranslateButton from '@/airdev/frontend/components/ui/TranslateButton';
import { Home, Menu } from 'lucide-react';
import Link from 'next/link';
import { createElement, useEffect, useMemo, useRef, useState } from 'react';

type Props = React.PropsWithChildren<{
  items?: BreadcrumbItem[];
  tabs?: BreadcrumbItem[];
  isLoading?: boolean;
}>;

export default function HeaderBar({
  items,
  tabs,
  children,
  isLoading = false,
}: Props) {
  const contentContainerRef = useRef<HTMLDivElement>(null);
  const contentMeasureRef = useRef<HTMLDivElement>(null);
  const [shouldShowCollapsedMenu, setShouldShowCollapsedMenu] = useState(false);
  const hasTabs = (tabs?.length ?? 0) > 0;
  const fullItems = useMemo<BreadcrumbItem[]>(
    () => [
      {
        label: createElement(Home, { className: 'size-4' }),
        href: airdevPublicConfig.shell.routes.homeHref,
      },
      ...(items ?? []),
    ],
    [items]
  );

  useEffect(() => {
    if (!hasTabs) {
      setShouldShowCollapsedMenu(false);
      return;
    }

    const container = contentContainerRef.current;
    const measure = contentMeasureRef.current;
    if (!container || !measure) {
      return;
    }

    let frameId = 0;

    const updateCollapsedState = () => {
      const nextShouldCollapse = measure.scrollWidth > container.clientWidth;
      setShouldShowCollapsedMenu(nextShouldCollapse);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updateCollapsedState);
    };

    const observer = new ResizeObserver(scheduleUpdate);
    observer.observe(container);
    observer.observe(measure);
    scheduleUpdate();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [fullItems, hasTabs, tabs]);

  if (isLoading) {
    return (
      <div className="header-bg dark:bg-background/80 flex h-12 w-full items-center px-6 backdrop-blur-lg" />
    );
  }

  return (
    <div className="header-bg dark:bg-background/80 relative flex h-12 w-full items-center px-6 backdrop-blur-lg">
      <div
        ref={contentContainerRef}
        className="relative flex min-w-0 flex-1 items-center gap-4"
      >
        {hasTabs && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0">
            <div
              ref={contentMeasureRef}
              className="inline-flex items-center gap-4 whitespace-nowrap"
            >
              <div className="inline-flex items-center gap-2 text-sm font-medium whitespace-nowrap">
                {fullItems.map((item, index) => (
                  <div
                    key={`${item.href ?? 'breadcrumb'}-${index}`}
                    className="inline-flex items-center gap-2"
                  >
                    {index > 0 ? (
                      <span className="text-muted-foreground/50">/</span>
                    ) : null}
                    {item.label ? <span>{item.label}</span> : null}
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                {tabs?.map((item, index) => (
                  <span
                    key={item.href ?? `tab-${index}`}
                    className="rounded-md px-3 py-1.5 text-sm font-medium"
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {shouldShowCollapsedMenu ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="hover:text-foreground text-muted-foreground flex size-9 cursor-pointer items-center justify-center rounded-md transition-colors">
              <Menu className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {fullItems.map((item, index) => (
                <DropdownMenuItem
                  key={`${item.href ?? 'breadcrumb'}-${index}`}
                  asChild
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex w-full cursor-pointer items-center gap-2"
                    >
                      <span>{item.label || 'Home'}</span>
                    </Link>
                  ) : (
                    <span className="flex w-full cursor-pointer items-center gap-2">
                      <span>{item.label}</span>
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
              {hasTabs && <DropdownMenuSeparator />}
              {tabs?.map((item, index) => (
                <DropdownMenuItem key={item.href ?? `tab-${index}`} asChild>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="flex w-full cursor-pointer items-center gap-2"
                    >
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <span className="flex w-full cursor-pointer items-center gap-2">
                      <span>{item.label}</span>
                    </span>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          fullItems.length > 0 && (
            <div className="min-w-0 flex-1">
              <ResponsiveBreadcrumb items={fullItems} />
            </div>
          )
        )}
      </div>

      {!shouldShowCollapsedMenu && hasTabs ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="pointer-events-auto flex gap-1">
            {tabs?.map((item, index) =>
              item.href ? (
                <Link
                  key={item.href ?? `tab-${index}`}
                  href={item.href}
                  className="text-muted-foreground hover:bg-accent/50 hover:text-foreground rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  key={item.href ?? `tab-${index}`}
                  className="rounded-md px-3 py-1.5 text-sm font-medium"
                >
                  {item.label}
                </span>
              )
            )}
          </div>
        </div>
      ) : null}

      {!hasTabs && children ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="pointer-events-auto">{children}</div>
        </div>
      ) : null}

      {/* Right: Actions */}
      <div className="ml-auto flex flex-none items-center justify-end space-x-4 pl-4">
        <TranslateButton />
      </div>
    </div>
  );
}
