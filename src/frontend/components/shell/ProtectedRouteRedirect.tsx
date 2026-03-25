'use client';

import { ROOT_HREF } from '@/common/constant';
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
    router.replace(ROOT_HREF);
  }, [currentUser, isFetched, isFetching, router, setUser]);

  return null;
}
