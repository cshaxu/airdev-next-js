import { INTERNAL_SECRET } from '@/edge/config';
import { buildHeaders, getCurrentUser } from '@/edge/sdks/backend';
import { commonHandlerConfig } from '@/framework/callbacks';
import { Context } from '@/framework/context';
import { HandlerConfig } from '@airent/api-next';

export const edgeHandlerConfig: HandlerConfig<Context, any, any, any, any> = {
  ...commonHandlerConfig,
  authenticator,
};

async function authenticator(request: Request): Promise<Context> {
  const time = new Date();
  const { method, url, headers: originalHeaders } = request;
  const headers = buildHeaders(originalHeaders, {
    additionalEntries: { 'X-INTERNAL-SECRET': INTERNAL_SECRET },
  });
  const currentUser = await getCurrentUser(headers);
  return { time, method, url, headers, currentUser };
}
