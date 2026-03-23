import type {
  ShellComponentAdapter,
  ShellNavigationAdapter,
} from '@airdev/next/adapter/frontend/shell';
import { House } from 'lucide-react';
import { createElement } from 'react';

function EmptyStudio() {
  return null;
}

function EmptyLanding() {
  return null;
}

export const bootstrapShellNavigationAdapter: ShellNavigationAdapter = {
  primaryItems: [
    {
      key: 'home',
      label: 'Home',
      href: '/',
      match: (pathname) => pathname === '/',
      renderIcon: (className) => createElement(House, { className }),
    },
  ],
  adminTabItems: [
    { key: 'users', label: 'Users', href: '/admin/users' },
    { key: 'api', label: 'API', href: '/admin/api' },
  ],
  shouldAutoCollapse: (pathname) => pathname.startsWith('/admin'),
  homeHref: '/dashboard',
  adminHref: '/admin',
  settingsHref: '/settings',
  privacyHref: '/privacy',
  termsHref: '/terms',
  logoutCallbackUrl: '/',
};

export const bootstrapShellComponentAdapter: ShellComponentAdapter = {
  logoSrc: '/logo.png',
  LandingComponent: EmptyLanding,
  AirentApiNextStudioComponent: EmptyStudio,
};
