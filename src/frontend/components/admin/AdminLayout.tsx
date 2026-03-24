import { getRealCurrentUser } from '@/package/backend/lib/framework';
import { initializePermission } from '@/package/frontend/initializePermission';
import { ReactNodeProps } from '@/package/frontend/types/props';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import AdminNav from './AdminNav';

export default async function AdminLayout({ children }: ReactNodeProps) {
  const queryClient = new QueryClient();
  await initializePermission(queryClient);
  const realCurrentUser = await getRealCurrentUser();
  if (!realCurrentUser?.isAdmin) {
    return redirect('/');
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <AdminNav />
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="size-full overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
