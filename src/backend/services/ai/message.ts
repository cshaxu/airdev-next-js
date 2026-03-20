import { generateChatStream } from '@/backend/ai/chat-stream-generator';
import { ChatEntity } from '@/backend/entities/chat';
import { ChatMessageEntity } from '@/backend/entities/chat-message';
import { mockStreamText } from '@/backend/sdks/ai';
import ChatService from '@/backend/services/data/chat';
import ChatMessageService from '@/backend/services/data/chat-message';
import { GetBotMessageStreamBody } from '@/common/types/api/stream';
import { adminOrThrow, Context } from '@/framework/context';
import { buildMissingErrorMessage } from '@airent/api';
import createHttpError from 'http-errors';

export async function getBotMessageStream(
  body: GetBotMessageStreamBody,
  context: Context
): Promise<Response> {
  const {
    chatId,
    prompt,
    userChatMessageId,
    userChatMessageAttachments,
    botChatMessageId,
  } = body;

  const onStreamDone = async (event: { text: string }) => {
    const body = { id: botChatMessageId, userId: null, text: event.text };
    await ChatMessageService.createOne(chatId, body, context);
  };

  const canAccessChat = await ChatService.checkAccess(chatId, context);
  if (!canAccessChat) {
    adminOrThrow(context);
  }

  const chat = await ChatEntity.findUnique({ where: { id: chatId } }, context);
  if (chat === null) {
    throw createHttpError.NotFound(
      buildMissingErrorMessage(`Chat (${chatId})`)
    );
  }

  const botChatMessageCount = await ChatMessageEntity.count({
    where: { chatId, userId: null },
  });

  const trimmedPrompt = prompt.trim();
  const currentUserId = context.currentUser?.id ?? null;
  const userChatMessage =
    trimmedPrompt.length === 0
      ? undefined
      : {
          id: userChatMessageId ?? crypto.randomUUID(),
          userId: currentUserId,
          text: trimmedPrompt,
          attachments: userChatMessageAttachments,
        };

  if (botChatMessageCount === 0 || userChatMessage === undefined) {
    return mockStreamText('Hello, how can I help you today?', async (text) => {
      await onStreamDone({ text });
    });
  }

  if (currentUserId === null) {
    adminOrThrow(context);
  }

  await ChatMessageService.createOne(chatId, userChatMessage, context);

  return await generateChatStream(chat, onStreamDone, context);
}
