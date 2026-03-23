import {
  POSTMARK_WEBHOOK_SECRET,
  POSTMARK_WEBHOOK_SECRET_HEADER_KEY,
} from '@/backend/config';
import { PostmarkWebhookBody } from '@/common/types/vendors/postmark';
import { Context } from '@/framework/context';
import { buildInvalidErrorMessage, parseBodyWith } from '@airent/api';
import createHttpError from 'http-errors';

export function authorizer(context: Context): void {
  const { headers } = context;
  const secret = headers.get(POSTMARK_WEBHOOK_SECRET_HEADER_KEY);
  if (secret !== POSTMARK_WEBHOOK_SECRET) {
    throw createHttpError.Forbidden(buildInvalidErrorMessage('access'));
  }
}

export const Params = PostmarkWebhookBody;

export async function parser(request: Request): Promise<PostmarkWebhookBody> {
  return await parseBodyWith(Params)(request);
}

export const executor = async (
  _body: PostmarkWebhookBody,
  _context: Context
) => {
  return { success: true };
};
