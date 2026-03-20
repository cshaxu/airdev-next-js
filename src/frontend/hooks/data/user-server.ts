import { getFrameworkIntegration } from '@/integration/backend/framework';

export const currentUserServerQueryOptions = {
  queryKey: ['currentUser'],
  queryFn: () =>
    getFrameworkIntegration().currentUserServerQueryOptions.queryFn(),
};
