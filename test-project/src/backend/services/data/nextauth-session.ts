import { NextauthSessionEntity } from '@/backend/entities/nextauth-session';
import { Context } from '@/framework/context';

const deleteManyByUser = async (userId: string, context: Context) => {
  const many = await NextauthSessionEntity.findMany(
    { where: { userId } },
    context
  );
  await Promise.all(many.map((one) => one.delete()));
  return many.length;
};

const NextauthSessionService = { deleteManyByUser };

export default NextauthSessionService;
