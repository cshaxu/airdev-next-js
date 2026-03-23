import { shellAdapter } from '@airdev/next/adapter/frontend/shell';
import { SESSION_TOKEN_COOKIE_NAME } from '@airdev/next/backend/lib/nextauth/cookies';
import { currentUserServerQueryOptions } from '@airdev/next/frontend/hooks/data/user-server';
import { withError } from '@airdev/next/frontend/utils/page';
import { QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function Page() {
  const cookieStore = await cookies();
  if (!cookieStore.has(SESSION_TOKEN_COOKIE_NAME)) {
    const LandingComponent = shellAdapter.component.LandingComponent;
    return <LandingComponent />;
  }

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
