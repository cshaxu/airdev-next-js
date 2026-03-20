import * as SlackSdk from '@/backend/sdks/slack';
import { Context } from '@/framework/context';
import { CommonResponse } from '@airent/api';

export const event = 'test-scheduled-job';

export type Params = { text: string };

export async function executor(
  params: Params,
  _rc: Context
): Promise<CommonResponse<Params>> {
  await SlackSdk.sendMessage(SlackSdk.SupportedChannel.DEV, params.text);
  return { code: 200, result: params };
}
