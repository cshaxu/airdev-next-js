import {
  UserQueries,
  useDeleteOneUser,
  useUpdateOneUser,
} from '@/generated/tanstack-hooks/user-client';
import { useCreateOneNextauthVerificationToken } from '@/generated/tanstack-hooks/nextauth-verification-token-client';
import type { ClientQueryAdapter } from './types';

export const defaultClientQueryAdapter: ClientQueryAdapter = {
  getManyUsersQueryOptions: ({ q }) =>
    UserQueries.getMany({ q }) as ReturnType<
      ClientQueryAdapter['getManyUsersQueryOptions']
    >,
  useDeleteOneUser:
    useDeleteOneUser as ClientQueryAdapter['useDeleteOneUser'],
  useUpdateOneUser:
    useUpdateOneUser as ClientQueryAdapter['useUpdateOneUser'],
  useCreateOneNextauthVerificationToken:
    useCreateOneNextauthVerificationToken as ClientQueryAdapter['useCreateOneNextauthVerificationToken'],
};

export let clientQueryAdapter: ClientQueryAdapter = defaultClientQueryAdapter;

export function setClientQueryAdapter(adapter: ClientQueryAdapter): void {
  clientQueryAdapter = adapter;
}
