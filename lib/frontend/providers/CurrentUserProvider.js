'use client';
import { useNullableCurrentUser } from '../hooks/data/user';
import { useSetUser } from '../stores/currentUserStore';
import { useEffect } from 'react';
export default function CurrentUserProvider() {
    const setUser = useSetUser();
    const { data: currentUser } = useNullableCurrentUser();
    useEffect(() => {
        setUser(currentUser ?? undefined);
    }, [currentUser, setUser]);
    return null;
}
//# sourceMappingURL=CurrentUserProvider.js.map