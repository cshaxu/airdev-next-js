import ProtectedLayoutView from '@airdev/next/frontend/components/shell/ProtectedLayoutView';
import { initializePermission } from '@airdev/next/frontend/initializePermission';
import CurrentUserProvider from '@airdev/next/frontend/providers/CurrentUserProvider';
import BottomNavBarClient from '@airdev/next/frontend/routes/shell/BottomNavBarClient';
import SideNavBarClient from '@airdev/next/frontend/routes/shell/SideNavBarClient';
import { ReactNodeProps } from '@airdev/next/frontend/types/props';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export const dynamic = 'force-dynamic';

export default async function ProtectedLayout({ children }: ReactNodeProps) {
  const queryClient = new QueryClient();
  await initializePermission(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CurrentUserProvider />
      <ProtectedLayoutView
        sideNav={<SideNavBarClient />}
        bottomNav={<BottomNavBarClient />}
      >
        {children}
      </ProtectedLayoutView>
    </HydrationBoundary>
  );
}
