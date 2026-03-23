'use client';

import { CurrentUserFieldRequest } from '@/common/types/context';
import UserApiClient from '@/generated/clients/user';
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

const getNullableCurrentUser = () =>
  UserApiClient.getOneSafe({ id: 'me' }, CurrentUserFieldRequest).then(
    (r) => r.user
  );

const nullableCurrentUserQueryOptions = queryOptions({
  ...currentUserQueryOptions,
  queryFn: getNullableCurrentUser,
});

export const useNullableCurrentUser = () =>
  useQuery(nullableCurrentUserQueryOptions);

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
