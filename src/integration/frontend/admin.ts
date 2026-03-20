import type { CurrentUser } from '@/common/types/context';
import type { ComponentType } from 'react';

export type AdminTabDefinition = {
  href: string;
  key: string;
  label: string;
  match?: (pathname: string) => boolean;
};

export type AdminUserRecord = Pick<
  CurrentUser,
  'id' | 'email' | 'name' | 'imageUrl' | 'isAdmin'
>;

export type SearchUsersResult = {
  data?: AdminUserRecord[];
  isFetching: boolean;
};

export type UpdateUserMutation = {
  isPending: boolean;
  mutateAsync: (variables: {
    body: Record<string, unknown>;
    params: { id: string };
  }) => Promise<void>;
};

function EmptyStudio() {
  return null;
}

export interface AdminFrontendIntegration {
  StudioComponent: ComponentType;
  tabs: AdminTabDefinition[];
  useSearchUsers: (query: string) => SearchUsersResult;
  useUpdateUser: () => UpdateUserMutation;
}

const defaultIntegration: AdminFrontendIntegration = {
  StudioComponent: EmptyStudio,
  // TODO: split tabs out to a separate integration point
  tabs: [
    { key: 'users', label: 'Users', href: '/admin/users' },
    { key: 'api', label: 'API', href: '/admin/api' },
  ],
  useSearchUsers: () => ({ data: [], isFetching: false }),
  useUpdateUser: () => ({ isPending: false, async mutateAsync() {} }),
};

let adminFrontendIntegration: AdminFrontendIntegration | null = null;

export function setAdminFrontendIntegration(
  integration: AdminFrontendIntegration
): void {
  adminFrontendIntegration = integration;
}

export function getAdminFrontendIntegration(): AdminFrontendIntegration {
  return {
    ...defaultIntegration,
    ...adminFrontendIntegration,
    tabs: [
      ...defaultIntegration.tabs,
      ...(adminFrontendIntegration?.tabs || []),
    ],
  };
}

export function hasAdminFrontendIntegration(): boolean {
  return adminFrontendIntegration !== null;
}
