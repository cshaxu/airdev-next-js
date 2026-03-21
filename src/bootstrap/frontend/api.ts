import type { ApiClientAdapter } from '@/adapter/frontend/api-client';
import type { ServerApiClientAdapter } from '@/adapter/frontend/server-api-client';
import type { CurrentUser } from '@/common/types/context';

const bootstrapCurrentUser: CurrentUser = {
  id: 'user_1',
  email: 'account@example.com',
  name: 'Airdev User',
  imageUrl: null,
  isAdmin: true,
  createdAt: new Date(0),
};

export const bootstrapClientApiClientAdapter: ApiClientAdapter = {
  async becomeUser() {},
  async getNullableCurrentUser() {
    return bootstrapCurrentUser;
  },
};

export const bootstrapServerApiClientAdapter: ServerApiClientAdapter = {
  async fetchCurrentUser() {
    return bootstrapCurrentUser;
  },
};
