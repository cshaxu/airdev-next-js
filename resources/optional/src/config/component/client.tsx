/* "@airdev/next": "seeded" */

import { ClientComponentConfig } from '@/airdev/common/types/config';
import NavContent from '@/app/(protected)/components/NavContent';
import LandingPage from '@/app/components/Landing';

export const clientComponentConfig: ClientComponentConfig = {
  NavContent,
  SettingsContent: undefined,
  LandingPage,
};
