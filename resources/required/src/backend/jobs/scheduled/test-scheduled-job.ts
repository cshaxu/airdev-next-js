import {
  SystemScheduledJobResult,
  SystemScheduledJobStatus,
} from '@/common/types/data/system-scheduled-job';
import { Context } from '@airdev/next/framework/context';

export const event = 'test-scheduled-job';

export type Params = { text: string };

export async function executor(
  params: Params,
  _rc: Context
): Promise<SystemScheduledJobResult> {
  return { status: SystemScheduledJobStatus.COMPLETED, result: params };
}
