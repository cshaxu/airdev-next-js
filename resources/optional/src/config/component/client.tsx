import NavContent from '@/app/(protected)/components/NavContent';
import LandingPage from '@/app/components/Landing';
import { ClientComponentConfig } from '@airdev/next/common/types/config';

export const clientComponentConfig: ClientComponentConfig = {
  NavContent,
  SettingsContent: undefined,
  LandingPage,
};
