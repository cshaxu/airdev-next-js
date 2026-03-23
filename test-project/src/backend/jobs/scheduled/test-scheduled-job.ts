import { Context } from '@/framework/context';
import { CommonResponse } from '@airent/api';

export const event = 'test-scheduled-job';

export type Params = { text: string };

export async function executor(
  params: Params,
  _rc: Context
): Promise<CommonResponse<Params>> {
  return { code: 200, result: params };
}
