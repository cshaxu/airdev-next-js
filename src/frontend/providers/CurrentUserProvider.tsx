'use client';

import { useNullableCurrentUser } from '@airdev/next/frontend/hooks/data/user';
import { useSetUser } from '@airdev/next/frontend/stores/currentUserStore';
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
