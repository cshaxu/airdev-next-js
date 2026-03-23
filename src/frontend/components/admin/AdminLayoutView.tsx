import { AdminTabItem } from '@airdev/next/adapter/frontend/shell/types';
import AdminNav from '@airdev/next/frontend/components/admin/AdminNav';
import { ReactNodeProps } from '@airdev/next/frontend/types/props';

type Props = ReactNodeProps & { tabs: AdminTabItem[] };

export default function AdminLayoutView({ children, tabs }: Props) {
  return (
    <div className="flex h-full flex-col overflow-hidden">
      <AdminNav tabs={tabs} />
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="size-full overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
