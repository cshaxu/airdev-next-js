// library imports
import createHttpError from 'http-errors';

// config imports
import { adminOrThrow, Context } from '@/framework/context';

// entity imports
import { generateMessageSummary } from '@/backend/ai/message-summary-generator';
import { ChatEntity } from '@/backend/entities/chat';
import { ChatMessageEntity } from '@/backend/entities/chat-message';
import { ChatUserEntity } from '@/backend/entities/chat-user';
import { GetOneChatParams, UpdateOneChatBody } from '@/common/types/data/chat';
import { logInfo } from '@airent/api';
import { uniq } from 'lodash-es';
import ChatMessageService from './chat-message';
import ChatUserService from './chat-user';

async function checkAccess(chatId: string, context: Context): Promise<boolean> {
  const { currentUser } = context;
  if (currentUser === null) {
    return false;
  }
  const chat = await ChatEntity.findUnique({ where: { id: chatId } }, context);
  if (chat === null) {
    throw createHttpError.NotFound();
  }
  const chatUser = await ChatUserEntity.findFirst(
    { where: { chatId, userId: currentUser.id } },
    context
  );
  return chatUser !== null;
}

async function afterGetOne(
  one: ChatEntity,
  _params: GetOneChatParams,
  context: Context
): Promise<void> {
  const canAccess = await checkAccess(one.id, context);
  if (!canAccess) {
    adminOrThrow(context);
  }
}

async function getOne(
  params: GetOneChatParams,
  context: Context
): Promise<ChatEntity> {
  const chat = await ChatEntity.findUnique(
    { where: { id: params.id } },
    context
  );
  if (chat === null) {
    throw createHttpError.NotFound();
  }
  return chat;
}

async function createOne(
  userId: string,
  context: Context
): Promise<ChatEntity> {
  const one = await ChatEntity.create({ data: {} }, context);
  await ChatUserEntity.create({ data: { chatId: one.id, userId } }, context);
  return one;
}

async function beforeUpdateOne(
  one: ChatEntity,
  _body: UpdateOneChatBody,
  context: Context
): Promise<void> {
  const canAccess = await checkAccess(one.id, context);
  if (!canAccess) {
    adminOrThrow(context);
  }
}

async function updateOne(
  one: ChatEntity,
  body: UpdateOneChatBody,
  _context: Context
): Promise<ChatEntity> {
  if (body.clear) {
    await ChatMessageService.deleteMany(one.id);
  }
  return one;
}

async function summarizeOne(
  one: ChatEntity,
  context: Context
): Promise<ChatEntity> {
  const { summary: lastSummary, summarizedAt: lastSummarizedAt } = one;
  const recentChatMessages = await ChatMessageEntity.findMany(
    {
      where: {
        chatId: one.id,
        ...(lastSummarizedAt !== null && {
          createdAt: { gt: lastSummarizedAt },
        }),
      },
      orderBy: { createdAt: 'asc' },
    },
    context
  );
  const summarizedAt = recentChatMessages.at(-1)?.createdAt ?? context.time;
  const summary = await generateMessageSummary(lastSummary, recentChatMessages);
  if (summary.length < 1) {
    return one;
  }
  logInfo({ chatId: one.id, summarizedAt, summary });
  one.summary = summary;
  one.summarizedAt = summarizedAt;
  return await one.save();
}

async function deleteOne(
  one: ChatEntity,
  _context: Context
): Promise<ChatEntity> {
  await ChatMessageService.deleteMany(one.id);
  await ChatUserService.deleteMany(one.id);
  return await one.delete();
}

async function deleteMany(userId: string, context: Context): Promise<number> {
  const chatUsers = await ChatUserEntity.findMany(
    { where: { userId } },
    context
  );
  const chatIds = uniq(chatUsers.map((cu) => cu.chatId));
  const chats = await ChatEntity.findMany(
    { where: { id: { in: chatIds } } },
    context
  );
  await Promise.all(chats.map((c) => deleteOne(c, context)));
  return chats.length;
}

const ChatService = {
  getOne,
  afterGetOne,
  createOne,
  beforeUpdateOne,
  updateOne,
  checkAccess,
  deleteMany,
  summarizeOne,
};

export default ChatService;
