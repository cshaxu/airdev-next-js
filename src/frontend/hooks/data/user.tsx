'use client';

import { clientFunctionConfig } from '@/config/function/client';
import {
  CurrentUser,
  CurrentUserFieldRequest,
} from '@/package/common/types/context';
import {
  queryOptions,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

type UpdateOneUserMutationParams = {
  params: Parameters<typeof clientFunctionConfig.apiClient.user.updateOne>[0];
  body: Parameters<typeof clientFunctionConfig.apiClient.user.updateOne>[1];
};

const currentUserQueryOptions = {
  queryKey: ['currentUser'],
  retry: false,
  staleTime: 60 * 1000 * 5,
};

const getNullableCurrentUser = () =>
  clientFunctionConfig.apiClient.user
    .getOneSafe({ id: 'me' }, CurrentUserFieldRequest)
    .then((page) => page.user);

const requiredCurrentUserQueryOptions = queryOptions({
  ...currentUserQueryOptions,
  queryFn: () =>
    getNullableCurrentUser().then((user) => {
      if (user === null) {
        throw new Error('A visitor should not access this page');
      }
      return user;
    }),
});

export const useRequiredCurrentUser = () =>
  useSuspenseQuery(requiredCurrentUserQueryOptions);

const nullableCurrentUserQueryOptions = queryOptions({
  ...currentUserQueryOptions,
  queryFn: getNullableCurrentUser,
});

export const useNullableCurrentUser = () =>
  useQuery(nullableCurrentUserQueryOptions);

export function useUpdateCurrentUser(
  options: Partial<
    UseMutationOptions<CurrentUser, any, UpdateOneUserMutationParams>
  > = {}
): UseMutationResult<CurrentUser, any, UpdateOneUserMutationParams> {
  const mutationKey = ['updateCurrentUser'];
  const mutationFn = ({ params, body }: UpdateOneUserMutationParams) =>
    clientFunctionConfig.apiClient.user
      .updateOne(params, body, CurrentUserFieldRequest)
      .then((page) => page.user);

  const queryClient = useQueryClient();

  const onSuccess = (data: CurrentUser) => {
    queryClient.invalidateQueries({ queryKey: ['users', 'getMany'] });
    queryClient.setQueryData(currentUserQueryOptions.queryKey, data);
  };

  return useMutation({ mutationKey, mutationFn, onSuccess, ...options });
}
