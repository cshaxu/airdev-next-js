import { POSTMARK_STREAM_TRANSACTIONAL_DEFAULT } from '@/backend/config';
import * as PostmarkSdk from '@/backend/sdks/postmark';
import { buildEmailSender } from '@/backend/utils/email';
import { APP_NAME } from '@/common/config';
import VerificationCode from '@/emails/VerificationCode';
import { render } from '@react-email/render';

export async function sendEmail(
  code: string,
  receiver: string
): Promise<boolean> {
  const subject = `${code} is your ${APP_NAME} sign-in code`;
  const payload = { subject, code };

  const stream = POSTMARK_STREAM_TRANSACTIONAL_DEFAULT;
  const sender = buildEmailSender(APP_NAME, 'no-reply');
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
