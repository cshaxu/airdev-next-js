import { edgeConfig } from '@/config/json/edge';
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
    additionalEntries: { 'X-INTERNAL-SECRET': edgeConfig.internalSecret },
  });
  const currentUser = await getCurrentUser(headers);
  return { time, method, url, headers, currentUser };
}
