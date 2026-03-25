import { clientFunctionConfig } from '@/config/function/client';
import { CurrentUser } from '../../../common/types/context.js';
import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
type UpdateOneUserMutationParams = {
    params: Parameters<typeof clientFunctionConfig.apiClient.user.updateOne>[0];
    body: Parameters<typeof clientFunctionConfig.apiClient.user.updateOne>[1];
};
export declare const useRequiredCurrentUser: () => import("@tanstack/react-query").UseSuspenseQueryResult<any, Error>;
export declare const useNullableCurrentUser: () => import("@tanstack/react-query").UseQueryResult<any, Error>;
export declare function useUpdateCurrentUser(options?: Partial<UseMutationOptions<CurrentUser, any, UpdateOneUserMutationParams>>): UseMutationResult<CurrentUser, any, UpdateOneUserMutationParams>;
export {};
