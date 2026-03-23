'use client';

import { clientQueryAdapter } from '@airdev/next/adapter/frontend/query';
import { shellAdapter } from '@airdev/next/adapter/frontend/shell';
import Settings from '@airdev/next/frontend/components/settings/Settings';
import { withError } from '@airdev/next/frontend/utils/page';

function SettingsPage() {
  return (
    <Settings
      homeHref={shellAdapter.navigation.homeHref}
      logoutCallbackUrl={shellAdapter.navigation.logoutCallbackUrl}
      useDeleteOneUser={clientQueryAdapter.useDeleteOneUser}
      useUpdateOneUser={clientQueryAdapter.useUpdateOneUser}
    />
  );
}

const SafeSettingsPage = withError(SettingsPage);
export default SafeSettingsPage;
