import type { CurrentUser } from '@/common/types/context';

export type UpdateCurrentUserParams = {
  body: { name: string };
  params: { id: string };
};

export type DeleteCurrentUserParams = {
  id: string;
};

export type MutationOptions<TData> = {
  onSuccess?: (data: TData) => void | Promise<void>;
};

export type MutationLike<TData, TVariables> = {
  isPending: boolean;
  mutate: (variables: TVariables, options?: MutationOptions<TData>) => void;
};

export interface SettingsFrontendIntegration {
  dashboardHref: string;
  useDeleteCurrentUser: () => MutationLike<unknown, DeleteCurrentUserParams>;
  useUpdateCurrentUser: () => MutationLike<
    CurrentUser,
    UpdateCurrentUserParams
  >;
}

const defaultMutation = {
  isPending: false,
  mutate: (_variables: unknown, options?: MutationOptions<unknown>) => {
    void options?.onSuccess?.(undefined);
  },
};

const defaultIntegration: SettingsFrontendIntegration = {
  dashboardHref: '/dashboard',
  useDeleteCurrentUser: () => defaultMutation,
  useUpdateCurrentUser: () =>
    defaultMutation as MutationLike<CurrentUser, UpdateCurrentUserParams>,
};

let settingsFrontendIntegration: SettingsFrontendIntegration | null = null;

export function setSettingsFrontendIntegration(
  integration: SettingsFrontendIntegration
): void {
  settingsFrontendIntegration = integration;
}

export function getSettingsFrontendIntegration(): SettingsFrontendIntegration {
  return settingsFrontendIntegration ?? defaultIntegration;
}

export function hasSettingsFrontendIntegration(): boolean {
  return settingsFrontendIntegration !== null;
}
