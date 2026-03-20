import Pusher from 'pusher';

import { PUSHER_APP_ID, PUSHER_SECRET } from '@/backend/config';
import { PUSHER_CLUSTER, PUSHER_KEY } from '@/common/config';
import {
  PUSHER_NOTIFICATION_EVENT_NAME,
  PusherAuthForm,
  PusherNotificationPayload,
} from '@/common/types/vendors/pusher';
import { Context } from '@/framework/context';
import { logError } from '@/framework/logging';
import { logInfo } from '@airent/api';

const PUSHER_CONFIG = {
  appId: PUSHER_APP_ID,
  secret: PUSHER_SECRET,
  key: PUSHER_KEY,
  cluster: PUSHER_CLUSTER,
  // useTLS: true,
};

const getClient = () => new Pusher(PUSHER_CONFIG);

export async function authorizeChannel(
  body: PusherAuthForm,
  context: Context
): Promise<Pusher.ChannelAuthResponse | null> {
  const { socket_id: socketId, channel_name: channelName } = body;
  const currentUserId = context.currentUser?.id;
  if (currentUserId === undefined || !channelName.includes(currentUserId)) {
    return null;
  }
  return getClient().authorizeChannel(socketId, channelName);
}

export async function publishNotification(
  userId: string,
  data: PusherNotificationPayload
): Promise<boolean> {
  const channel = buildChannelName(userId);
  const event = PUSHER_NOTIFICATION_EVENT_NAME;
  try {
    logInfo({ channel, event, data });
    await getClient().trigger(channel, event, data);
    return true;
  } catch (error) {
    logError(error, { channel, event, data });
    return false;
  }
}

const buildChannelName = (userId: string) => `private-user-${userId}`;
