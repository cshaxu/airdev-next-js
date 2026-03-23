'use client';

import { apiClientAdapter } from '@airdev/next/adapter/frontend/api-client';
import { shellAdapter } from '@airdev/next/adapter/frontend/shell';
import { publicConfig } from '@airdev/next/common/config';
import SideNavBar from '@airdev/next/frontend/components/shell/SideNavBar';

export default function SideNavBarClient() {
  return (
    <SideNavBar
      adminHref={shellAdapter.navigation.adminHref}
      appName={publicConfig.app.name}
      becomeUser={apiClientAdapter.becomeUser}
      logoSrc={shellAdapter.component.logoSrc}
      logoutCallbackUrl={shellAdapter.navigation.logoutCallbackUrl}
      navItems={shellAdapter.navigation.primaryItems}
      settingsHref={shellAdapter.navigation.settingsHref}
      shouldAutoCollapse={shellAdapter.navigation.shouldAutoCollapse}
    />
  );
}
