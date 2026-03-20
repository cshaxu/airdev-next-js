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
  const where = { ...params, type: String(params.type) };
  return await UserMemoryEntity.findFirst({ where }, context);
}

async function createOne(
  body: CreateOneUserMemoryBody,
  context: Context
): Promise<UserMemoryEntity> {
  const data = { ...body, type: String(body.type) };
  const one = await UserMemoryEntity.findFirst({ where: data }, context);
  if (one !== null) {
    return one;
  }
  return await UserMemoryEntity.create({ data }, context);
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

const deleteManyByUser = (userId: string, _rc: Context) =>
  UserMemoryEntity.deleteMany({ where: { userId } }).then((r) => r.count);

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
