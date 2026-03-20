'use client';

import { cn } from '@/frontend/lib/cn';

export type SidebarItem = { id: string; name: string; subtitle?: string };

type Props = {
  title: string;
  items: SidebarItem[];
  selectedId: string;
  onSelectId: (id: string) => void;
  disabled?: boolean;
};

export default function Sidebar({
  title,
  items,
  selectedId,
  onSelectId,
  disabled,
}: Props) {
  return (
    <div className="flex h-full flex-col bg-[var(--nav-bg)]">
      <div className="border-b border-[var(--nav-separator)] px-4 py-2">
        <h3 className="text-blue-dark-75 text-sm font-medium dark:text-white">
          {title}
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <div className="space-y-1 px-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                'relative flex w-full items-start rounded-xl px-2 py-2 transition-colors md:px-3',
                disabled
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer hover:bg-[var(--nav-hover)] active:bg-[var(--nav-hover)]',
                selectedId === item.id && 'bg-[var(--nav-hover)]'
              )}
              onClick={() => (disabled ? undefined : onSelectId(item.id))}
            >
              <div className="flex flex-1 flex-col items-start gap-x-3 text-left">
                <span className="text-sm font-medium text-[var(--nav-text)] dark:text-white">
                  {item.name.trim().length > 0 ? item.name.trim() : '(Empty)'}
                </span>
                {item.subtitle && (
                  <span className="text-muted-foreground text-xs">
                    {item.subtitle}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
