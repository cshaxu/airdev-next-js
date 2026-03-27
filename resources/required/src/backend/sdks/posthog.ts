/* "@airdev/next": "managed" */

import { Context } from '@/airdev/framework/context';
import { publicAppConfig } from '@/config/public-app';
import { PostHog } from 'posthog-node';

type PostHogEventMessage = {
  event: string;
  properties: Record<string, any>;
};

export default function logPostHogEvent(
  context: Context,
  eventMessage: PostHogEventMessage
) {
  const client = new PostHog(publicAppConfig.posthog.apiToken, {
    host: publicAppConfig.posthog.apiHost,
    flushAt: 1,
    flushInterval: 0,
  });

  client.capture({
    distinctId: context.currentUser?.email || '',
    event: eventMessage.event,
    properties: eventMessage.properties,
  });
  return client.shutdown();
}

export function getIsFeatureFlagEnabled(userEmail: string, feature: string) {
  const client = new PostHog(publicAppConfig.posthog.apiToken, {
    host: publicAppConfig.posthog.apiHost,
    flushAt: 1,
    flushInterval: 0,
  });
  return client.isFeatureEnabled(feature, userEmail);
}
