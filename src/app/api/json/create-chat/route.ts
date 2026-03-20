import { handleBackendJsonJsonWith } from '@/backend/lib/handlers';
import ChatService from '@/backend/services/data/chat';
import { CreateChatBody } from '@/common/types/api/json';
import { adminOrThrow, Context } from '@/framework/context';

async function executor(_body: CreateChatBody, context: Context) {
  if (context.currentUser === null) {
    adminOrThrow(context);
  }

  const chat = await ChatService.createOne(context.currentUser!.id, context);
  return { chat: { id: chat.id, createdAt: chat.createdAt } };
}

export const POST = handleBackendJsonJsonWith({
  bodyZod: CreateChatBody,
  executor,
});
