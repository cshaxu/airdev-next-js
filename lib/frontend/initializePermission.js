import { AUTH_SIGNIN_HREF, HEADER_URL_KEY } from '../common/constant';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { currentUserServerQueryOptions } from './hooks/data/user-server';
export async function initializePermission(queryClient) {
    const currentUser = await queryClient.fetchQuery(currentUserServerQueryOptions);
    const headersList = await headers();
    const pathname = headersList.get(HEADER_URL_KEY) || '';
    if (!currentUser?.id) {
        return redirect(`${AUTH_SIGNIN_HREF}?next=${encodeURIComponent(pathname)}`);
    }
    return { currentUser };
}
//# sourceMappingURL=initializePermission.js.map