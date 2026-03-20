import { currentUserServerQueryOptions } from '@/frontend/hooks/data/user-server';
import { getFrameworkIntegration } from '@/integration/backend/framework';
import { QueryClient } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export async function initializePermission(queryClient: QueryClient) {
  const frameworkIntegration = getFrameworkIntegration();
  const currentUser = await queryClient.fetchQuery(
    currentUserServerQueryOptions
  );

  if (!frameworkIntegration.isConfigured) {
    return { currentUser };
  }

  const headersList = await headers();
  const pathname = headersList.get('x-url') || '';

  if (!currentUser?.id) {
    return redirect(
      frameworkIntegration.buildProtectedRedirect?.(pathname) ??
        `/auth/signin?next=${encodeURIComponent(pathname)}`
    );
  }

  return { currentUser };
}
