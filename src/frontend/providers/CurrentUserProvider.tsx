'use client';

import { useCurrentUserSafe } from '@/frontend/hooks/data/user';
import { useSetUser } from '@/frontend/stores/currentUserStore';
import { useEffect } from 'react';

export default function CurrentUserProvider() {
  const setUser = useSetUser();
  const { data: currentUser } = useCurrentUserSafe();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser, setUser]);

  return null;
}
