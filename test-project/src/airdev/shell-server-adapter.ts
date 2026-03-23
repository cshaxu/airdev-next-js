import type { ShellAdapter } from '@airdev/next/adapter/frontend/shell';
import AirentApiNextStudio from '@/generated/airent-api-next-studio';
import LandingPageView from '@/app/components/LandingPageView';
import { airdevClientShellAdapter } from './shell-client-adapter';

export const airdevServerShellAdapter: ShellAdapter = {
  ...airdevClientShellAdapter,
  component: {
    ...airdevClientShellAdapter.component,
    LandingComponent: LandingPageView,
    AirentApiNextStudioComponent: AirentApiNextStudio,
  },
};
