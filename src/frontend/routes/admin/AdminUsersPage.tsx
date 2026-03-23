'use client';

import { apiClientAdapter } from '@airdev/next/adapter/frontend/api-client';
import { clientQueryAdapter } from '@airdev/next/adapter/frontend/query';
import UserSearch from '@airdev/next/frontend/components/admin/UserSearch';
import { withError } from '@airdev/next/frontend/utils/page';

function AdminUsersPage() {
  return (
    <UserSearch
      becomeUser={apiClientAdapter.becomeUser}
      getManyUsersQueryOptions={clientQueryAdapter.getManyUsersQueryOptions}
      useUpdateOneUser={clientQueryAdapter.useUpdateOneUser}
    />
  );
}

const SafeAdminUsersPage = withError(AdminUsersPage);
export default SafeAdminUsersPage;
