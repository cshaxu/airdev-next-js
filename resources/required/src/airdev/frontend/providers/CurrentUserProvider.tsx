/* "@airdev/next": "managed" */

'use client';

import { useNullableCurrentUser } from '@/airdev/frontend/hooks/data/user';
import { useSetUser } from '@/airdev/frontend/stores/currentUserStore';
import { useEffect } from 'react';

export default function CurrentUserProvider() {
  const setUser = useSetUser();
  const { data: currentUser } = useNullableCurrentUser();

  useEffect(() => {
    setUser(currentUser ?? undefined);
  }, [currentUser, setUser]);

  return null;
}
