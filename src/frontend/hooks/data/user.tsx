'use client';

import { CurrentUser, CurrentUserFieldRequest } from '@/common/types/context';
import { GetOneUserParams } from '@/common/types/data/user';
import useHandleMutationError from '@/frontend/hooks/useHandleMutationError';
import { GetOneUserFieldRequest } from '@/frontend/types/data';
import UserApiClient from '@/generated/clients/user';
import { UpdateOneUserMutationParams } from '@/generated/tanstack-hooks/user-client';
import { GetOneSelectedUserResponse } from '@/generated/tanstack-hooks/user-types';
import {
  queryOptions,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

const currentUserQueryOptions = {
  queryKey: ['currentUser'],
  retry: false,
  staleTime: 60 * 1000 * 5,
};

const getCurrentUserSafe = () =>
  UserApiClient.getOneSafe({ id: 'me' }, CurrentUserFieldRequest).then(
    (r) => r.user
  );

const currentUserRequiredQueryOptions = queryOptions({
  ...currentUserQueryOptions,
  queryFn: () =>
    getCurrentUserSafe().then((user) => {
      if (user === null) {
        throw new Error('A visitor should not access this page');
      }
      return user;
    }),
});

export const useCurrentUserRequired = () =>
  useSuspenseQuery(currentUserRequiredQueryOptions);

const currentUserSafeQueryOptions = queryOptions({
  ...currentUserQueryOptions,
  queryFn: getCurrentUserSafe,
});

export function useUpdateOneUserNotificationSubscriptions(
  options: Partial<
    UseMutationOptions<
      GetOneSelectedUserResponse,
      any,
      UpdateOneUserMutationParams
    >
  > = {}
): UseMutationResult<
  GetOneSelectedUserResponse,
  any,
  UpdateOneUserMutationParams
> {
  const mutationKey = ['updateOneUser'];
  const mutationFn = ({ params, body }: UpdateOneUserMutationParams) =>
    UserApiClient.updateOne(params, body, GetOneUserFieldRequest).then(
      (page) => page.user
    );

  return useMutation({
    mutationKey,
    mutationFn,
    ...options,
  });
}

export function useUpdateCurrentUser(
  options: Partial<
    UseMutationOptions<CurrentUser, any, UpdateOneUserMutationParams>
  > = {}
): UseMutationResult<CurrentUser, any, UpdateOneUserMutationParams> {
  const mutationKey = ['updateCurrentUser'];
  const mutationFn = ({ params, body }: UpdateOneUserMutationParams) =>
    UserApiClient.updateOne(params, body, CurrentUserFieldRequest).then(
      (page) => page.user
    );

  const queryClient = useQueryClient();
  const onError = useHandleMutationError();

  const onSuccess = (data: CurrentUser) => {
    queryClient.invalidateQueries({ queryKey: ['users', 'getMany'] });
    queryClient.setQueryData(currentUserQueryOptions.queryKey, data);
  };

  return useMutation({
    mutationKey,
    mutationFn,
    onError,
    onSuccess,
    ...options,
  });
}

export const useCurrentUserSafe = () => useQuery(currentUserSafeQueryOptions);

export function useGetOneUserSafeMutation() {
  return useMutation({
    mutationFn: (params: GetOneUserParams) =>
      UserApiClient.getOneSafe(params, { id: true }),
  });
}
