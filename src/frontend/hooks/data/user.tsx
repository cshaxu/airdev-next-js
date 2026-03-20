'use client';

import { getSettingsFrontendIntegration } from '@/integration/frontend/settings';
import { getShellFrontendIntegration } from '@/integration/frontend/shell';

export const useCurrentUserRequired = () => {
  return getShellFrontendIntegration().useCurrentUserRequired();
};

export const useCurrentUserSafe = () => {
  return getShellFrontendIntegration().useCurrentUserSafe();
};

export const useUpdateCurrentUser = () => {
  return getSettingsFrontendIntegration().useUpdateCurrentUser();
};

export const useDeleteCurrentUser = () => {
  return getSettingsFrontendIntegration().useDeleteCurrentUser();
};
