import { SLACK_BOT_TOKEN } from '@/backend/config';
import { logError } from '@/framework/logging';
import { WebClient } from '@slack/web-api';

export enum SupportedChannel {
  DEV = 'dev',
}

export async function sendMessage(
  channel: SupportedChannel,
  text: string
): Promise<boolean> {
  const slackClient = new WebClient(SLACK_BOT_TOKEN);
  const data = { channel, text };
  try {
    const { ok } = await slackClient.chat.postMessage(data);
    return ok;
  } catch (error) {
    logError(error, data);
    return false;
  }
}
