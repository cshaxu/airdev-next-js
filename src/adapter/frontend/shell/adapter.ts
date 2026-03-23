import { defaultShellAdapter } from '@airdev/next/adapter/defaults';
import type { ShellAdapter } from './index';

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
      adminTabItems: [
        { key: 'users', label: 'Users', href: '/admin/users' },
        { key: 'api', label: 'API', href: '/admin/api' },
        ...adapter.navigation.adminTabItems,
      ],
    },
    component: { ...adapter.component },
  };
}
