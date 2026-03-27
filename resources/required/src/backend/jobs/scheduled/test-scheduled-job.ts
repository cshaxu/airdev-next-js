/* "@airdev/next": "managed" */

import { Context } from '@/airdev/framework/context';
import {
  SystemScheduledJobResult,
  SystemScheduledJobStatus,
} from '@/common/types/data/system-scheduled-job';

export const event = 'test-scheduled-job';

export type Params = { text: string };

export async function executor(
  params: Params,
  _rc: Context
): Promise<SystemScheduledJobResult> {
  return { status: SystemScheduledJobStatus.COMPLETED, result: params };
}
