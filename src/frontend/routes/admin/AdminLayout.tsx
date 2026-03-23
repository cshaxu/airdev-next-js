import { shellAdapter } from '@airdev/next/adapter/frontend/shell';
import { getRealCurrentUser } from '@airdev/next/backend/lib/framework';
import AdminLayoutView from '@airdev/next/frontend/components/admin/AdminLayoutView';
import { initializePermission } from '@airdev/next/frontend/initializePermission';
import { ReactNodeProps } from '@airdev/next/frontend/types/props';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: ReactNodeProps) {
  const queryClient = new QueryClient();
  await initializePermission(queryClient);
  const realCurrentUser = await getRealCurrentUser();
  if (!realCurrentUser?.isAdmin) {
    return redirect('/');
  }

  return (
    <AdminLayoutView tabs={shellAdapter.navigation.adminTabItems}>
      {children}
    </AdminLayoutView>
  );
}
