/* "@airdev/next": "managed" */

import { backupToS3 } from '@/airdev/backend/services/backup';
import { toDs, toStartTime } from '@/airdev/common/utils/date';
import { Context } from '@/airdev/framework/context';

export const maxDuration = 60;

export const schedule = '5 0 * * *';

export const executor = (context: Context) =>
  backupToS3(toStartTime(toDs(context.time)));
