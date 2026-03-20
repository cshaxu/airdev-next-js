import { UserEntity } from '@/backend/entities/user';
import * as SlackSdk from '@/backend/sdks/slack';
import { PostmarkWebhookBody } from '@/common/types/vendors/postmark';
import { Context } from '@/framework/context';

export async function sendSlack(
  body: PostmarkWebhookBody,
  context: Context
): Promise<boolean> {
  const user = await UserEntity.findUnique(
    { where: { email: body.Recipient } },
    context
  );
  if (user === null) {
    return false;
  }

  const title = `[*Email:${body.MessageStream}*]`;
  const fanText = `<mailto:${body.Recipient}|${user?.name || 'Someone'}>`;
  const actionText = `*${body.SuppressSending ? 'unsubscribed' : 'resubscribed'}*${
    body.SuppressionReason ? ` because of \`${body.SuppressionReason}\`` : ''
  }!`;
  const text = `${title} ${fanText} ${actionText}`;

  return await SlackSdk.sendMessage(SlackSdk.SupportedChannel.DEV, text);
}
