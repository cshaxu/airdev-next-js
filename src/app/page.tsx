import { shellAdapter } from '@/adapter/frontend/shell';
import { currentUserServerQueryOptions } from '@/frontend/hooks/data/user-server';
import { withError } from '@/frontend/utils/page';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function Page() {
  const queryClient = new QueryClient();
  const currentUser = await queryClient.fetchQuery(
    currentUserServerQueryOptions
  );
  if (currentUser !== null) {
    redirect(shellAdapter.navigation.homeHref);
  }

  const LandingComponent = shellAdapter.component.LandingComponent;
  return <LandingComponent />;
}

const SafePage = withError(Page);
export default SafePage;
