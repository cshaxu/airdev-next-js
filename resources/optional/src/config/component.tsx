/* "@airdev/next": "seeded" */

import { AirdevClientComponentConfig } from '@/airdev/common/types/config';
import NavContent from '@/app/(protected)/components/NavContent';
import LandingPage from '@/app/components/Landing';

export const clientComponentConfig: AirdevClientComponentConfig = {
  NavContent,
  SettingsContent: undefined,
  LandingPage,
};
