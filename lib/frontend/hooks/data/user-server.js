import { serverFunctionConfig } from '@/config/function/server';
import { CurrentUserFieldRequest } from '../../../common/types/context';
export const currentUserServerQueryOptions = {
    queryKey: ['currentUser'],
    queryFn: () => serverFunctionConfig.apiClient.user
        .getOneSafe({ id: 'me' }, CurrentUserFieldRequest)
        .then((page) => page.user),
};
//# sourceMappingURL=user-server.js.map