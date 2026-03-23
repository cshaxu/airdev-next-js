import { shellAdapter } from '@airdev/next/adapter';
import { currentUserServerQueryOptions } from '@airdev/next/frontend/hooks/data/user-server';
import SignInStepsClient from '@airdev/next/frontend/routes/auth/SignInStepsClient';
import { withError } from '@airdev/next/frontend/utils/page';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

type SignInPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function AuthSignInPage({ searchParams }: SignInPageProps) {
  const queryClient = new QueryClient();
  const resolvedSearchParams = await searchParams;
  const next =
    typeof resolvedSearchParams.next === 'string'
      ? resolvedSearchParams.next
      : undefined;
  const currentUser = await queryClient.fetchQuery(
    currentUserServerQueryOptions
  );

  if (currentUser) {
    redirect(next || shellAdapter.navigation.homeHref);
  }

  return (
    <Suspense>
      <SignInStepsClient />
    </Suspense>
  );
}

const SafeAuthSignInPage = withError(AuthSignInPage);
export default SafeAuthSignInPage;
