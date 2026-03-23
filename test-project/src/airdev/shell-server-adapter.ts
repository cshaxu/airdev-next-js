import LandingPageView from '@/app/components/LandingPageView';
import AirentApiNextStudio from '@/generated/airent-api-next-studio';
import type { ShellAdapter } from '@airdev/next/adapter/frontend/shell';
import { airdevClientShellAdapter } from './shell-client-adapter';

export const airdevServerShellAdapter: ShellAdapter = {
  ...airdevClientShellAdapter,
  component: {
    ...airdevClientShellAdapter.component,
    LandingComponent: LandingPageView,
    AirentApiNextStudioComponent: AirentApiNextStudio,
  },
};
