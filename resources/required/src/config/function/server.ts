/* "@airdev/next": "managed" */

import type {
  ServerFunctionConfig,
  ServerFunctionConfigTypes,
} from '@/airdev/common/types/config';
import type { CurrentUser } from '@/airdev/common/types/context';
import { CurrentUserFieldRequest } from '@/airdev/common/types/context';
import UserServerApiClient from '@/generated/server-clients/user';

type AppServerFunctionConfigTypes = ServerFunctionConfigTypes & {
  user: CurrentUser;
  fieldRequest: typeof CurrentUserFieldRequest;
};

export const serverFunctionConfig: ServerFunctionConfig<AppServerFunctionConfigTypes> =
  { apiClient: { user: { getOneSafe: UserServerApiClient.getOneSafe } } };
