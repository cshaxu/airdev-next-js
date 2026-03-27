'use client';

import type { UpdateOneUserBody } from '@/common/types/data/user';
import { callBackendApi } from '@/frontend/lib/backend';
import UserApiClient from '@/generated/clients/user';
import { useCreateOneNextauthVerificationToken } from '@/generated/tanstack-hooks/nextauth-verification-token-client';
import {
  useDeleteOneUser,
  useMutationSearchUsers,
  useUpdateOneUser,
} from '@/generated/tanstack-hooks/user-client';
import { type SearchSelectedUserResponse } from '@/generated/tanstack-hooks/user-types';
import type {
  ClientFunctionConfig,
  ClientFunctionConfigTypes,
} from '@airdev/next/common/types/config';
import type { CurrentUser } from '@airdev/next/common/types/context';
import { CurrentUserFieldRequest } from '@airdev/next/common/types/context';
import { signIn, signOut } from 'next-auth/react';

type AppClientFunctionConfigTypes = ClientFunctionConfigTypes & {
  currentUser: CurrentUser;
  searchUser: SearchSelectedUserResponse;
  fieldRequest: typeof CurrentUserFieldRequest;
  updateUser: CurrentUser;
  updateBody: UpdateOneUserBody;
};

export const clientFunctionConfig: ClientFunctionConfig<AppClientFunctionConfigTypes> =
  {
    apiClient: {
      auth: {
        become: (userId: string | null) =>
          callBackendApi('/api/auth/become', { userId }),
        signIn,
        signOut,
      },
      user: { getOneSafe: UserApiClient.getOneSafe },
    },
    query: {
      nextauthVerificationToken: {
        useCreateOne: useCreateOneNextauthVerificationToken,
      },
      user: {
        useMutationSearch: useMutationSearchUsers,
        useUpdateOne: useUpdateOneUser,
        useDeleteOne: useDeleteOneUser,
      },
    },
  };
