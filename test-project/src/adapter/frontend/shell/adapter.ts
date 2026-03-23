import LandingPageView from '@/app/components/LandingPageView';
import { MAIN_NAV_ITEMS } from '@/app/(protected)/components/NavConfig';
import type { ShellAdapter } from './types';

const defaultShellAdapter: ShellAdapter = {
  navigation: {
    primaryItems: MAIN_NAV_ITEMS.map((item) => ({
      key: item.key,
      label: item.label,
      href: item.to,
      match: item.isActive,
      renderIcon: item.renderIcon,
    })),
    adminTabItems: [
      { key: 'users', label: 'Users', href: '/admin/users' },
      { key: 'api', label: 'API', href: '/admin/api' },
      { key: 'test', label: 'Admin Test', href: '/admin/test' },
    ],
    shouldAutoCollapse: (pathname) => pathname.startsWith('/admin'),
    homeHref: '/dashboard',
    adminHref: '/admin',
    settingsHref: '/settings',
    privacyHref: '/privacy',
    termsHref: '/terms',
    logoutCallbackUrl: '/',
  },
  component: {
    logoSrc: '/logo.png',
    LandingComponent: LandingPageView,
    AirentApiNextStudioComponent: () => null,
  },
};

export let shellAdapter: ShellAdapter = defaultShellAdapter;

export function setShellAdapter(adapter: ShellAdapter): void {
  shellAdapter = {
    ...defaultShellAdapter,
    ...adapter,
    navigation: {
      ...defaultShellAdapter.navigation,
      ...adapter.navigation,
      primaryItems:
        adapter.navigation?.primaryItems ??
        defaultShellAdapter.navigation.primaryItems,
      adminTabItems:
        adapter.navigation?.adminTabItems ??
        defaultShellAdapter.navigation.adminTabItems,
    },
    component: {
      ...defaultShellAdapter.component,
      ...adapter.component,
    },
  };
}
