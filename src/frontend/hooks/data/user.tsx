'use client';

import { apiClientAdapter } from '@airdev/next/adapter/frontend/api-client';
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
