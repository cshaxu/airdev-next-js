import { UserMemoryEntity } from '@/backend/entities/user-memory';
import {
  CreateOneUserMemoryBody,
  GetOneUserMemoryParams,
} from '@/common/types/data/user-memory';
import { Context, selfOrThrow } from '@/framework/context';
import createHttpError from 'http-errors';

async function getOne(
  params: GetOneUserMemoryParams,
  context: Context
): Promise<UserMemoryEntity> {
  const one = await getOneSafe(params, context);
  if (one === null) {
    throw createHttpError.NotFound();
  }
  return one;
}

async function beforeGetOneSafe(
  params: GetOneUserMemoryParams,
  context: Context
): Promise<void> {
  selfOrThrow(context, params.userId);
}

async function getOneSafe(
  params: GetOneUserMemoryParams,
  context: Context
): Promise<UserMemoryEntity | null> {
  const where = { ...params };
  return await UserMemoryEntity.findFirst({ where }, context);
}

async function createOne(
  body: CreateOneUserMemoryBody,
  context: Context
): Promise<UserMemoryEntity> {
  const data = { ...body };
  const one = await UserMemoryEntity.findFirst({ where: data }, context);
  if (one !== null) {
    return one;
  }
  return await UserMemoryEntity.create(
    {
      data: {
        id: crypto.randomUUID(),
        createdAt: context.time,
        ...data,
      },
    },
    context
  );
}

async function beforeDeleteOne(
  one: UserMemoryEntity,
  context: Context
): Promise<void> {
  selfOrThrow(context, one.userId);
}

async function deleteOne(
  one: UserMemoryEntity,
  _context: Context
): Promise<UserMemoryEntity> {
  return await one.delete();
}

const deleteManyByUser = async (userId: string, context: Context) => {
  const many = await UserMemoryEntity.findMany({ where: { userId } }, context);
  await Promise.all(many.map((one) => one.delete()));
  return many.length;
};

const UserMemoryService = {
  getOne,
  beforeGetOneSafe,
  getOneSafe,
  createOne,
  beforeDeleteOne,
  deleteOne,
  deleteManyByUser,
};

export default UserMemoryService;
