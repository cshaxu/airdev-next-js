import { publicConfig } from '@/config/public';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { currentUserServerQueryOptions } from './hooks/data/user-server';
export async function initializePermission(queryClient) {
    const currentUser = await queryClient.fetchQuery(currentUserServerQueryOptions);
    const headersList = await headers();
    const pathname = headersList.get('x-url') || '';
    if (!currentUser?.id) {
        return redirect(`${publicConfig.nextauth.signIn}?next=${encodeURIComponent(pathname)}`);
    }
    return { currentUser };
}
//# sourceMappingURL=initializePermission.js.map