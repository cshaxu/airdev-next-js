import { nextauthAdapter } from '@/adapter/backend/nextauth';
import { currentUserServerQueryOptions } from '@/frontend/hooks/data/user-server';
import { QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function initializePermission(queryClient: QueryClient) {
  const currentUser = await queryClient.fetchQuery(
    currentUserServerQueryOptions
  );

  const headersList = await headers();
  const pathname = headersList.get('x-url') || '';

  if (!currentUser?.id) {
    return redirect(
      `${nextauthAdapter.signInPath}?next=${encodeURIComponent(pathname)}`
    );
  }

  return { currentUser };
}
