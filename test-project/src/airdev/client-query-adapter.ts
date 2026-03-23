import type { ClientQueryAdapter } from '@airdev/next/adapter/frontend/query';
import {
  UserQueries,
  useDeleteOneUser,
  useUpdateOneUser,
} from '@/generated/tanstack-hooks/user-client';
import { useCreateOneNextauthVerificationToken } from '@/generated/tanstack-hooks/nextauth-verification-token-client';

export const airdevClientQueryAdapter: ClientQueryAdapter = {
  getManyUsersQueryOptions: ({ q }) =>
    UserQueries.getMany({ q }) as unknown as ReturnType<
      ClientQueryAdapter['getManyUsersQueryOptions']
    >,
  useDeleteOneUser:
    useDeleteOneUser as ClientQueryAdapter['useDeleteOneUser'],
  useUpdateOneUser:
    useUpdateOneUser as ClientQueryAdapter['useUpdateOneUser'],
  useCreateOneNextauthVerificationToken:
    useCreateOneNextauthVerificationToken as ClientQueryAdapter['useCreateOneNextauthVerificationToken'],
};
