import { EdgeConfig as AirdevEdgeConfig } from '@airdev/next/common/types/config';

const INTERNAL_SECRET = process.env.BAREBONE_NEXT_INTERNAL_SECRET!;
const CRON_SECRET = process.env.CRON_SECRET ?? INTERNAL_SECRET;

export const edgeConfig: AirdevEdgeConfig = {
  internalSecret: INTERNAL_SECRET,
  cronSecret: CRON_SECRET,
};
