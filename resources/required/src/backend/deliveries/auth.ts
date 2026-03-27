/* "@airdev/next": "managed" */

import * as PostmarkSdk from '@/backend/sdks/postmark';
import { buildEmailSender } from '@/backend/utils/email';
import { privateAppConfig } from '@/config/private-app';
import { publicAppConfig } from '@/config/public-app';
import VerificationCode from '@/emails/VerificationCode';
import { render } from '@react-email/render';

export async function sendEmail(
  code: string,
  receiver: string
): Promise<boolean> {
  const subject = `${code} is your ${publicAppConfig.app.name} sign-in code`;
  const payload = { subject, code };

  const stream = privateAppConfig.postmark.defaultTransactionStream;
  const sender = buildEmailSender(publicAppConfig.app.name, 'no-reply');
  const htmlBody = await render(VerificationCode(payload));

  const email = {
    stream,
    sender,
    receiver,
    subject,
    htmlBody,
    tag: PostmarkSdk.PostmarkTags.SYSTEM_VERIFICATION_CODE,
    metadata: {},
  };
  return await PostmarkSdk.sendOneEmail(email);
}
