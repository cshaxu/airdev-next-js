'use client';

import { apiClientAdapter } from '@/adapter/frontend/api-client';
import { clientQueryAdapter } from '@/adapter/frontend/query';
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

const currentUserQueryOptions = {
  queryKey: ['currentUser'],
  retry: false,
  staleTime: 60 * 1000 * 5,
};

const nullableCurrentUserQueryOptions = queryOptions({
  ...currentUserQueryOptions,
  queryFn: apiClientAdapter.getNullableCurrentUser,
});

export const useNullableCurrentUser = () =>
  useQuery(nullableCurrentUserQueryOptions);

const requiredCurrentUserQueryOptions = queryOptions({
  ...currentUserQueryOptions,
  queryFn: () =>
    apiClientAdapter.getNullableCurrentUser().then((user) => {
      if (user === null) {
        throw new Error('A visitor should not access this page');
      }
      return user;
    }),
});

export const useRequiredCurrentUser = () =>
  useSuspenseQuery(requiredCurrentUserQueryOptions);

export const getManyUsersQueryOptions = (q: string) =>
  clientQueryAdapter.getManyUsersQueryOptions({ q });

export const useUpdateOneUser = clientQueryAdapter.useUpdateOneUser;

export const useDeleteOneUser = clientQueryAdapter.useDeleteOneUser;

export const useCreateOneNextauthVerificationToken =
  clientQueryAdapter.useCreateOneNextauthVerificationToken;
