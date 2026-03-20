import { handleBackendAnyJsonWith } from '@/backend/lib/handlers';
import * as PusherSdk from '@/backend/sdks/pusher';
import { PusherAuthForm } from '@/common/types/vendors/pusher';
import { parseFormWith } from '@airent/api';

const parser = parseFormWith(PusherAuthForm);

const executor = PusherSdk.authorizeChannel;

const options = { requireLogin: false };

export const POST = handleBackendAnyJsonWith({ parser, executor, options });
