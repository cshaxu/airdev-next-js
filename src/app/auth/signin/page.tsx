import { shellAdapter } from '@airdev/next/adapter';
import { currentUserServerQueryOptions } from '@airdev/next/frontend/hooks/data/user-server';
import { withError } from '@airdev/next/frontend/utils/page';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import SignInSteps from './components/SignInSteps';

export const dynamic = 'force-dynamic';

type SignInPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function Page({ searchParams }: SignInPageProps) {
  const queryClient = new QueryClient();
  const resolvedSearchParams = await searchParams;
  const next =
    typeof resolvedSearchParams.next === 'string'
      ? resolvedSearchParams.next
      : undefined;
  const currentUser = await queryClient.fetchQuery(
    currentUserServerQueryOptions
  );

  if (!!currentUser) {
    redirect(next || shellAdapter.navigation.homeHref);
  }

  return (
    <Suspense>
      <SignInSteps />
    </Suspense>
  );
}

const SafePage = withError(Page);
export default SafePage;
