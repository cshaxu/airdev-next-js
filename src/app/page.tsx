import { currentUserServerQueryOptions } from '@/frontend/hooks/data/user-server';
import { withError } from '@/frontend/utils/page';
import { getRootFrontendIntegration } from '@/integration/frontend/root';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function Page() {
  const queryClient = new QueryClient();
  const currentUser = await queryClient.fetchQuery(
    currentUserServerQueryOptions
  );
  const rootIntegration = getRootFrontendIntegration();

  if (currentUser !== null) {
    redirect(rootIntegration.defaultLoggedInRoute);
  }

  const LandingComponent = rootIntegration.LandingComponent;
  return <LandingComponent />;
}

const SafePage = withError(Page);
export default SafePage;
