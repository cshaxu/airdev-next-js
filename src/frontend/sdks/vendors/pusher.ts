import { PUSHER_CLUSTER, PUSHER_KEY } from '@/common/config';
import Pusher from 'pusher-js';

const pusher = new Pusher(PUSHER_KEY, {
  cluster: PUSHER_CLUSTER,
  channelAuthorization: { transport: 'ajax', endpoint: '/api/auth/pusher' },
});

export { pusher };
