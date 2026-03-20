import { POSTHOG_API_HOST, POSTHOG_API_TOKEN } from '@/common/config';
import { Context } from '@/framework/context';
import { PostHog } from 'posthog-node';

type PostHogEventMessage = {
  event: string;
  properties: Record<string, any>;
};

export default function logPostHogEvent(
  context: Context,
  eventMessage: PostHogEventMessage
) {
  const client = new PostHog(POSTHOG_API_TOKEN, {
    host: POSTHOG_API_HOST,
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
  const client = new PostHog(POSTHOG_API_TOKEN, {
    host: POSTHOG_API_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  return client.isFeatureEnabled(feature, userEmail);
}
