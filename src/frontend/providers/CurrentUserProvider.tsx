'use client';

import { useNullableCurrentUser } from '@/frontend/hooks/data/user';
import { useSetUser } from '@/frontend/stores/currentUserStore';
import { useEffect } from 'react';

export default function CurrentUserProvider() {
  const setUser = useSetUser();
  const { data: currentUser } = useNullableCurrentUser();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser, setUser]);

  return null;
}
