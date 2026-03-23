import { currentUserServerQueryOptions } from '@/frontend/hooks/data/user-server';
import { withError } from '@/frontend/utils/page';
import { NextPageProps } from '@airent/api-next';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import SignInSteps from './components/SignInSteps';

export const dynamic = 'force-dynamic';

async function Page({ searchParams }: NextPageProps<{}, { next: string }>) {
  const queryClient = new QueryClient();
  const { next } = await searchParams;
  const currentUser = await queryClient.fetchQuery(
    currentUserServerQueryOptions
  );

  if (!!currentUser) {
    redirect(next || '/');
  }

  return (
    <Suspense>
      <SignInSteps />
    </Suspense>
  );
}

const SafePage = withError(Page);
export default SafePage;
