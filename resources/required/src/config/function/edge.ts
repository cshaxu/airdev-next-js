/* "@airdev/next": "managed" */

import type {
  EdgeFunctionConfig,
  EdgeFunctionConfigTypes,
} from '@/airdev/common/types/config';
import {
  ContextUserFieldRequest,
  type ContextUser,
} from '@/airdev/framework/context';
import UserEdgeApiClient from '@/generated/edge-clients/user';

type AppEdgeFunctionConfigTypes = EdgeFunctionConfigTypes & {
  user: ContextUser;
  fieldRequest: typeof ContextUserFieldRequest;
};

export const edgeFunctionConfig: EdgeFunctionConfig<AppEdgeFunctionConfigTypes> =
  { apiClient: { user: { getOneSafe: UserEdgeApiClient.getOneSafe } } };
