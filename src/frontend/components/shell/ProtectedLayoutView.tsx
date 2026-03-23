import { ReactNode } from 'react';

type Props = {
  bottomNav: ReactNode;
  children: ReactNode;
  sideNav: ReactNode;
};

export default function ProtectedLayoutView({
  bottomNav,
  children,
  sideNav,
}: Props) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <main className="h-full flex-1 overflow-hidden">
        <div className="flex h-full">
          <div className="hidden h-full md:block">{sideNav}</div>

          <div className="protected-mobile-main h-full min-w-0 flex-1 overflow-hidden pb-16 md:pb-0">
            {children}
          </div>
        </div>
      </main>
      {bottomNav}
    </div>
  );
}
