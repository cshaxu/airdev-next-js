'use client';
import { clientFunctionConfig } from '@/config/function/client';
import { CurrentUserFieldRequest } from '../../../common/types/context.js';
import { queryOptions, useMutation, useQuery, useQueryClient, useSuspenseQuery, } from '@tanstack/react-query';
const currentUserQueryOptions = {
    queryKey: ['currentUser'],
    retry: false,
    staleTime: 60 * 1000 * 5,
};
const getNullableCurrentUser = () => clientFunctionConfig.apiClient.user
    .getOneSafe({ id: 'me' }, CurrentUserFieldRequest)
    .then((page) => page.user);
const requiredCurrentUserQueryOptions = queryOptions({
    ...currentUserQueryOptions,
    queryFn: () => getNullableCurrentUser().then((user) => {
        if (user === null) {
            throw new Error('A visitor should not access this page');
        }
        return user;
    }),
});
export const useRequiredCurrentUser = () => useSuspenseQuery(requiredCurrentUserQueryOptions);
const nullableCurrentUserQueryOptions = queryOptions({
    ...currentUserQueryOptions,
    queryFn: getNullableCurrentUser,
});
export const useNullableCurrentUser = () => useQuery(nullableCurrentUserQueryOptions);
export function useUpdateCurrentUser(options = {}) {
    const mutationKey = ['updateCurrentUser'];
    const mutationFn = ({ params, body }) => clientFunctionConfig.apiClient.user
        .updateOne(params, body, CurrentUserFieldRequest)
        .then((page) => page.user);
    const queryClient = useQueryClient();
    const onSuccess = (data) => {
        queryClient.invalidateQueries({ queryKey: ['users', 'getMany'] });
        queryClient.setQueryData(currentUserQueryOptions.queryKey, data);
    };
    return useMutation({ mutationKey, mutationFn, onSuccess, ...options });
}
//# sourceMappingURL=user.js.map