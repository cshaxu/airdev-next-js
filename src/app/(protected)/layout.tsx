import { initializePermission } from '@/app/(protected)/initializePermission';
import CurrentUserProvider from '@/frontend/providers/CurrentUserProvider';
import { ReactNodeProps } from '@/frontend/types/props';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import BottomNavBar from './components/BottomNavBar';
import SideNavBar from './components/SideNavBar';

export const dynamic = 'force-dynamic';

export default async function ProtectedLayout({ children }: ReactNodeProps) {
  const queryClient = new QueryClient();
  await initializePermission(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CurrentUserProvider />
      <div className="flex h-screen flex-col overflow-hidden">
        <main className="h-full flex-1 overflow-hidden">
          <div className="flex h-full">
            <div className="hidden h-full md:block [@media(orientation:portrait)]:hidden">
              <SideNavBar />
            </div>

            <div className="protected-mobile-main h-full min-w-0 flex-1 overflow-hidden pb-16 md:pb-0 [@media(orientation:portrait)]:pb-16">
              {children}
            </div>
          </div>
        </main>
        <BottomNavBar />
      </div>
    </HydrationBoundary>
  );
}
