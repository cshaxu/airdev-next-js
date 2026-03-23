import { MAIN_NAV_ITEMS } from '@/app/(protected)/components/NavConfig';
import type { ShellAdapter } from '@airdev/next/adapter/frontend/shell';

export const airdevClientShellAdapter: ShellAdapter = {
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
    LandingComponent: () => null,
    AirentApiNextStudioComponent: () => null,
  },
};
