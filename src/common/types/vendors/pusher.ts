import * as z from 'zod';

export const PusherAuthForm = z.object({
  socket_id: z.string(),
  channel_name: z
    .string()
    .refine(
      (v) => v.startsWith('private-'),
      'invalid channel_name: expected to start with "private-"'
    ),
});
export type PusherAuthForm = z.infer<typeof PusherAuthForm>;

export const PUSHER_NOTIFICATION_EVENT_NAME = 'notification-received';

export type PusherNotificationPayload = {};
