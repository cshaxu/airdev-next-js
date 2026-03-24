import HeaderBar from '@/package/frontend/components/shell/HeaderBar';

export default function SettingsLoading() {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <HeaderBar isLoading />
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="size-full overflow-y-auto p-6">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-muted h-[92px] animate-pulse rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
