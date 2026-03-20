import type { CurrentUser } from '@/common/types/context';
import { House } from 'lucide-react';
import { createElement, type ReactNode } from 'react';

export type ShellNavItem = {
  href: string;
  key: string;
  label: string;
  match?: (pathname: string) => boolean;
  renderIcon: (className: string) => ReactNode;
};

export interface ShellFrontendIntegration {
  adminHref: string;
  adminItem?: ShellNavItem;
  appName: string;
  becomeUser: (userId: string | null) => Promise<void> | void;
  logoAlt: string;
  logoSrc: string;
  logoutCallbackUrl: string;
  primaryItems: ShellNavItem[];
  settingsHref: string;
  shouldAutoCollapse?: (pathname: string) => boolean;
  signOut: (callbackUrl: string) => Promise<void> | void;
  useCurrentUserRequired: () => { data: CurrentUser };
  useCurrentUserSafe: () => { data: CurrentUser | null | undefined };
}

const defaultUser: CurrentUser = {
  id: 'user_1',
  email: 'account@example.com',
  name: 'Airdev User',
  imageUrl: null,
  isAdmin: true,
  createdAt: new Date(0),
};

const defaultIntegration: ShellFrontendIntegration = {
  adminHref: '/admin',
  adminItem: {
    key: 'admin',
    label: 'Admin',
    href: '/admin',
    match: (pathname) => pathname.startsWith('/admin'),
    renderIcon: (className) => createElement(House, { className }),
  },
  appName: 'Airdev App',
  async becomeUser() {},
  logoAlt: 'Logo',
  logoSrc: '/logo.png',
  logoutCallbackUrl: '/',
  primaryItems: [
    {
      key: 'home',
      label: 'Home',
      href: '/',
      match: (pathname) => pathname === '/',
      renderIcon: (className) => createElement(House, { className }),
    },
  ],
  settingsHref: '/settings',
  shouldAutoCollapse: (pathname) => pathname.startsWith('/admin'),
  async signOut() {},
  useCurrentUserRequired: () => ({ data: defaultUser }),
  useCurrentUserSafe: () => ({ data: defaultUser }),
};

let shellFrontendIntegration: ShellFrontendIntegration | null = null;

export function setShellFrontendIntegration(
  integration: ShellFrontendIntegration
): void {
  shellFrontendIntegration = integration;
}

export function getShellFrontendIntegration(): ShellFrontendIntegration {
  return shellFrontendIntegration ?? defaultIntegration;
}

export function hasShellFrontendIntegration(): boolean {
  return shellFrontendIntegration !== null;
}
