import * as SlackSdk from '@/backend/sdks/slack';
import { CommonResponse, parseBodyWith } from '@airent/api';
import * as z from 'zod';

export const Params = z.object({
  channel: z.nativeEnum(SlackSdk.SupportedChannel),
  message: z.string(),
});
export type Params = z.infer<typeof Params>;

export const parser = parseBodyWith(Params);

export const executor = (params: Params) =>
  SlackSdk.sendMessage(params.channel, params.message).then(
    (success) => ({ code: success ? 200 : 500 }) as CommonResponse
  );
