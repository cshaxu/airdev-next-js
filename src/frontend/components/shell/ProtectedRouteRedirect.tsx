'use client';

import { useNullableCurrentUser } from '@/package/frontend/hooks/data/user';
import { useSetUser } from '@/package/frontend/stores/currentUserStore';
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
    router.replace('/');
  }, [currentUser, isFetched, isFetching, router, setUser]);

  return null;
}
