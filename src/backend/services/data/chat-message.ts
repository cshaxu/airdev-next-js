// library imports

// config imports
import { adminOrThrow, Context } from '@/framework/context';

// entity imports
import { ChatMessageEntity } from '@/backend/entities/chat-message';
import {
  CreateOneChatMessageBody,
  GetManyChatMessagesQuery,
  GetOneChatMessageParams,
} from '@/common/types/data/chat-message';
import { scheduleSummarizeChatEvent } from '@/generated/scheduler';
import { Prisma } from '@prisma/client';
import createHttpError from 'http-errors';
import ChatService from './chat';

async function beforeGetMany(
  query: GetManyChatMessagesQuery,
  context: Context
) {
  const canAccessChat = await ChatService.checkAccess(query.chatId, context);
  if (!canAccessChat) {
    adminOrThrow(context);
  }
}

async function getMany(
  query: GetManyChatMessagesQuery,
  context: Context
): Promise<ChatMessageEntity[]> {
  const { chatId, createdAtBefore } = query;
  return await ChatMessageEntity.findMany(
    {
      where: {
        chatId,
        ...(createdAtBefore && { createdAt: { lt: createdAtBefore } }),
      },
      orderBy: { createdAt: 'desc' },
    },
    context
  );
}

async function afterGetOne(
  one: ChatMessageEntity,
  _params: GetOneChatMessageParams,
  context: Context
) {
  const canAccessChat = await ChatService.checkAccess(one.chatId, context);
  if (!canAccessChat) {
    adminOrThrow(context);
  }
}

async function getOne(
  params: GetOneChatMessageParams,
  context: Context
): Promise<ChatMessageEntity> {
  const one = await ChatMessageEntity.findUnique(
    { where: { id: params.id } },
    context
  );
  if (one === null) {
    throw createHttpError.NotFound();
  }
  return one;
}

async function createOne(
  chatId: string,
  body: CreateOneChatMessageBody,
  context: Context
): Promise<ChatMessageEntity> {
  const { id, userId, text } = body;
  const data: Prisma.ChatMessageUncheckedCreateInput = {
    id,
    chatId,
    userId,
    content: { text },
  };
  const one = await ChatMessageEntity.create({ data }, context);

  // when user sends a message, try to summarize the chat
  await scheduleSummarizeChatEvent(
    { chatId: one.chatId },
    context.time,
    context
  );

  return one;
}

const deleteMany = (chatId: string) =>
  ChatMessageEntity.deleteMany({ where: { chatId } }).then((r) => r.count);

const ChatMessageService = {
  beforeGetMany,
  getMany,
  afterGetOne,
  getOne,
  createOne,
  deleteMany,
};

export default ChatMessageService;
