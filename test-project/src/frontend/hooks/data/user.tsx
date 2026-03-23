'use client';

import '@/airdev/setup-client';

export * from '@airdev/next/frontend/hooks/data/user';
import { clientQueryAdapter } from '@airdev/next/adapter/frontend/query';

export const useUpdateOneUser = () => clientQueryAdapter.useUpdateOneUser();

export const useDeleteOneUser = () => clientQueryAdapter.useDeleteOneUser();
