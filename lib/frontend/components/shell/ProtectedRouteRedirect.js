'use client';
import { ROOT_HREF } from '../../../common/constant.js';
import { useNullableCurrentUser } from '../../hooks/data/user.js';
import { useSetUser } from '../../stores/currentUserStore.js';
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
//# sourceMappingURL=ProtectedRouteRedirect.js.map