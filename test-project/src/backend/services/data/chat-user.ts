import { ChatUserEntity } from '@/backend/entities/chat-user';
import { mockContext } from '@/backend/lib/framework';
import { GetManyChatUsersQuery } from '@/common/types/data/chat-user';
import { getTake } from '@/common/utils/zod';
import { adminOrThrow, Context } from '@/framework/context';

async function beforeGetMany(
  query: GetManyChatUsersQuery,
  context: Context
): Promise<void> {
  if (query.userId !== context.currentUser?.id) {
    adminOrThrow(context);
  }
}

async function getMany(
  query: GetManyChatUsersQuery,
  context: Context
): Promise<ChatUserEntity[]> {
  const { userId, createdAtBefore } = query;
  const take = getTake(query);
  return await ChatUserEntity.findMany(
    {
      where: {
        userId,
        ...(createdAtBefore && { createdAt: { lt: createdAtBefore } }),
      },
      orderBy: { createdAt: 'desc' },
      take,
    },
    context
  );
}

const deleteMany = async (chatId: string) => {
  const context = await mockContext();
  const many = await ChatUserEntity.findMany({ where: { chatId } }, context);
  await Promise.all(many.map((one) => one.delete()));
  return many.length;
};

const ChatUserService = { beforeGetMany, getMany, deleteMany };

export default ChatUserService;
