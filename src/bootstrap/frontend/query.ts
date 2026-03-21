import type { ClientQueryAdapter } from '@/adapter/frontend/query';
import type { CurrentUser } from '@/common/types/context';

type UpdateOneUserMutation = ReturnType<ClientQueryAdapter['useUpdateOneUser']>;
type UpdateOneUserVariables = Parameters<UpdateOneUserMutation['mutate']>[0];
type UpdateOneUserOptions = Parameters<UpdateOneUserMutation['mutate']>[1];

type CreateVerificationTokenMutation = ReturnType<
  ClientQueryAdapter['useCreateOneNextauthVerificationToken']
>;
type CreateVerificationTokenVariables = Parameters<
  CreateVerificationTokenMutation['mutate']
>[0];
type CreateVerificationTokenOptions = Parameters<
  CreateVerificationTokenMutation['mutate']
>[1];

type DeleteOneUserMutation = ReturnType<ClientQueryAdapter['useDeleteOneUser']>;
type DeleteOneUserVariables = Parameters<DeleteOneUserMutation['mutate']>[0];
type DeleteOneUserOptions = Parameters<DeleteOneUserMutation['mutate']>[1];

const bootstrapCurrentUser: CurrentUser = {
  id: 'user_1',
  email: 'account@example.com',
  name: 'Airdev User',
  imageUrl: null,
  isAdmin: true,
  createdAt: new Date(0),
};

function createBootstrapUpdateOneUserMutation(): ReturnType<
  ClientQueryAdapter['useUpdateOneUser']
> {
  return {
    isPending: false,
    mutate: (
      _variables: UpdateOneUserVariables,
      options?: UpdateOneUserOptions
    ) => {
      void options?.onSuccess?.(
        bootstrapCurrentUser,
        _variables,
        undefined as never,
        undefined as never
      );
    },
    mutateAsync: async () => bootstrapCurrentUser,
  } as unknown as ReturnType<ClientQueryAdapter['useUpdateOneUser']>;
}

export const bootstrapClientQueryAdapter: ClientQueryAdapter = {
  useCreateOneNextauthVerificationToken: () =>
    ({
      isPending: false,
      mutate: (
        _variables: CreateVerificationTokenVariables,
        options?: CreateVerificationTokenOptions
      ) => {
        void options?.onSuccess?.(
          undefined,
          _variables,
          undefined as never,
          undefined as never
        );
      },
      mutateAsync: async () => undefined,
    }) as unknown as ReturnType<
      ClientQueryAdapter['useCreateOneNextauthVerificationToken']
    >,
  getManyUsersQueryOptions: ({ q }) => ({
    queryKey: ['users', 'getMany', q],
    queryFn: async () => [],
  }),
  useDeleteOneUser: () =>
    ({
      isPending: false,
      mutate: (
        _variables: DeleteOneUserVariables,
        options?: DeleteOneUserOptions
      ) => {
        void options?.onSuccess?.(
          undefined,
          _variables,
          undefined as never,
          undefined as never
        );
      },
      mutateAsync: async () => undefined,
    }) as unknown as ReturnType<ClientQueryAdapter['useDeleteOneUser']>,
  useUpdateOneUser: () => createBootstrapUpdateOneUserMutation(),
};
