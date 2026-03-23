import { NextauthAccountEntity } from '@/backend/entities/nextauth-account';
import { GetManyNextauthAccountsQuery } from '@/common/types/data/nextauth-account';
import { adminOrThrow, Context } from '@/framework/context';

async function beforeGetMany(
  query: GetManyNextauthAccountsQuery,
  context: Context
): Promise<void> {
  const { currentUser } = context;
  if (currentUser === null || query.userId !== currentUser.id) {
    adminOrThrow(context);
  }
}

async function getMany(
  query: GetManyNextauthAccountsQuery,
  context: Context
): Promise<NextauthAccountEntity[]> {
  const { userId, type, provider } = query;
  return await NextauthAccountEntity.findMany(
    { where: { userId, type, provider } },
    context
  );
}

const deleteManyByUser = async (userId: string, context: Context) => {
  const many = await NextauthAccountEntity.findMany(
    { where: { userId } },
    context
  );
  await Promise.all(many.map((one) => one.delete()));
  return many.length;
};

const NextauthAccountService = { beforeGetMany, getMany, deleteManyByUser };

export default NextauthAccountService;
