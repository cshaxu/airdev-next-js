import UserEdgeApiClient from '@/generated/edge-clients/user';
import type {
  EdgeFunctionConfig,
  EdgeFunctionConfigTypes,
} from '@airdev/next/common/types/config';
import {
  ContextUserFieldRequest,
  type ContextUser,
} from '@airdev/next/framework/context';

type AppEdgeFunctionConfigTypes = EdgeFunctionConfigTypes & {
  user: ContextUser;
  fieldRequest: typeof ContextUserFieldRequest;
};

export const edgeFunctionConfig: EdgeFunctionConfig<AppEdgeFunctionConfigTypes> =
  { apiClient: { user: { getOneSafe: UserEdgeApiClient.getOneSafe } } };
