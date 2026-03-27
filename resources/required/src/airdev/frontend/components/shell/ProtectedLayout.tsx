/* "@airdev/next": "managed" */

import CurrentUserProvider from '@/airdev/frontend/providers/CurrentUserProvider';
import { ReactNodeProps } from '@/airdev/frontend/types/props';
import BottomNavBar from './BottomNavBar';
import ProtectedRouteRedirect from './ProtectedRouteRedirect';
import SideNavBar from './SideNavBar';

export function generateProtectedLayoutMetadata() {
  return { robots: { index: false, follow: false, nocache: true } };
}

export default function ProtectedLayout({ children }: ReactNodeProps) {
  return (
    <>
      <CurrentUserProvider />
      <ProtectedRouteRedirect />
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
    </>
  );
}
