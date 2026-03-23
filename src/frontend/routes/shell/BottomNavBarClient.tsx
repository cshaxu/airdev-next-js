'use client';

import { apiClientAdapter } from '@airdev/next/adapter/frontend/api-client';
import { shellAdapter } from '@airdev/next/adapter/frontend/shell';
import BottomNavBar from '@airdev/next/frontend/components/shell/BottomNavBar';

export default function BottomNavBarClient() {
  return (
    <BottomNavBar
      adminHref={shellAdapter.navigation.adminHref}
      becomeUser={apiClientAdapter.becomeUser}
      logoutCallbackUrl={shellAdapter.navigation.logoutCallbackUrl}
      navItems={shellAdapter.navigation.primaryItems}
      settingsHref={shellAdapter.navigation.settingsHref}
    />
  );
}
