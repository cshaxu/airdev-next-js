'use client';

import { shellConfig } from '@/config/shell';
import { useNullableCurrentUser } from '@/frontend/hooks/data/user';
import { useSetUser } from '@/frontend/stores/currentUserStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRouteRedirect() {
  const router = useRouter();
  const setUser = useSetUser();
  const { data: currentUser, isFetched, isFetching } = useNullableCurrentUser();

  useEffect(() => {
    if (!isFetched || isFetching || currentUser !== null) {
      return;
    }

    setUser(undefined);
    router.replace(shellConfig.routes.rootHref);
  }, [currentUser, isFetched, isFetching, router, setUser]);

  return null;
}
