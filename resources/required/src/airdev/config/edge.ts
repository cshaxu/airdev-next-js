/* "@airdev/next": "managed" */

import { AirdevEdgeConfigBase } from '@/airdev/common/types/config';

const INTERNAL_SECRET = process.env.BAREBONE_NEXT_INTERNAL_SECRET!;
const CRON_SECRET = process.env.CRON_SECRET ?? INTERNAL_SECRET;

export const airdevEdgeConfig: AirdevEdgeConfigBase = {
  internalSecret: INTERNAL_SECRET,
  cronSecret: CRON_SECRET,
};
