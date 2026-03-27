import UserServerApiClient from '@/generated/server-clients/user';
import type {
  ServerFunctionConfig,
  ServerFunctionConfigTypes,
} from '@airdev/next/common/types/config';
import type { CurrentUser } from '@airdev/next/common/types/context';
import { CurrentUserFieldRequest } from '@airdev/next/common/types/context';

type AppServerFunctionConfigTypes = ServerFunctionConfigTypes & {
  user: CurrentUser;
  fieldRequest: typeof CurrentUserFieldRequest;
};

export const serverFunctionConfig: ServerFunctionConfig<AppServerFunctionConfigTypes> =
  { apiClient: { user: { getOneSafe: UserServerApiClient.getOneSafe } } };
