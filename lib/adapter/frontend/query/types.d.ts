import type { CurrentUser } from '@airdev/next/common/types/context';
import type { DefaultError, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
export type GetManyUsersQuery = {
    q?: string;
};
export type GetOneUserParams = {
    id: string;
};
export type UpdateOneUserBody = {
    name?: string;
    setAdmin?: boolean;
};
export type UpdateOneUserMutationParams = {
    params: GetOneUserParams;
    body: UpdateOneUserBody;
};
export type CreateOneNextauthVerificationTokenBody = {
    email: string;
};
export type SearchUser = Pick<CurrentUser, 'id' | 'name' | 'imageUrl' | 'isAdmin'>;
export type MutationOptions<TData> = {
    onSuccess?: (data: TData) => void | Promise<void>;
};
export type UseMutationHookLike<TData, TVariables> = (options?: Partial<UseMutationOptions<TData, DefaultError, TVariables>>) => UseMutationResult<TData, DefaultError, TVariables>;
export type QueryOptionsLike<TData> = {
    queryKey: readonly unknown[] | unknown[];
    queryFn: () => Promise<TData>;
};
export type ClientQueryAdapter = {
    getManyUsersQueryOptions: (query: GetManyUsersQuery) => QueryOptionsLike<SearchUser[]>;
    useUpdateOneUser: UseMutationHookLike<CurrentUser, UpdateOneUserMutationParams>;
    useDeleteOneUser: UseMutationHookLike<unknown, GetOneUserParams>;
    useCreateOneNextauthVerificationToken: UseMutationHookLike<unknown, CreateOneNextauthVerificationTokenBody>;
};
//# sourceMappingURL=types.d.ts.map