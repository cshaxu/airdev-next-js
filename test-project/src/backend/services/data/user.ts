import { UserEntity } from '@/backend/entities/user';
import {
  GetManyUsersQuery,
  GetOneUserParams,
  SearchUsersQuery,
  UpdateOneUserBody,
} from '@/common/types/data/user';
import { Context, selfOrThrow } from '@/framework/context';
import {
  buildInvalidErrorMessage,
  buildMissingErrorMessage,
  purify,
} from '@airent/api';
import { sequential } from 'airent';
import createHttpError from 'http-errors';
// import { parsePhoneNumber } from '';
import { UserModel } from '@/generated/types/user';
import NextauthAccountService from './nextauth-account';
import NextauthSessionService from './nextauth-session';
import NextauthVerificationTokenService from './nextauth-verification-token';
import UserMemoryService from './user-memory';
import { UserSearchService } from './user-search';

async function getMany(
  query: GetManyUsersQuery,
  context: Context
): Promise<UserEntity[]> {
  const q = query.q?.trim().toLowerCase();
  const where = q
    ? { OR: [{ name: { contains: q } }, { email: { contains: q } }] }
    : {};
  return UserEntity.findMany({ where, orderBy: { name: 'asc' } }, context);
}

async function search(
  query: SearchUsersQuery,
  context: Context
): Promise<UserEntity[]> {
  return await new UserSearchService().search(query, context);
}

async function getOne(
  params: GetOneUserParams,
  context: Context
): Promise<UserEntity> {
  const one = await getOneSafe(params, context);
  if (one === null) {
    throw createHttpError.NotFound(buildMissingErrorMessage('User', params));
  }
  return one;
}

async function getOneSafe(
  params: GetOneUserParams,
  context: Context
): Promise<UserEntity | null> {
  let id = params.id;

  if (id === null) {
    return null;
  }

  // short circuit
  if (id === 'me') {
    const { currentUser } = context;
    if (currentUser === null) {
      return null;
    }
    id = currentUser.id;
  }

  const where = { OR: [{ id }, { email: id }] };
  return await UserEntity.findFirst({ where }, context);
}

async function findOrCreateOne(
  email: string,
  context: Context
): Promise<UserEntity> {
  const existingOne = await UserEntity.findUnique(
    { where: { email } },
    context
  );
  if (existingOne !== null) {
    return existingOne;
  }
  return await UserEntity.create(
    {
      data: {
        id: crypto.randomUUID(),
        createdAt: context.time,
        updatedAt: context.time,
        name: email,
        email,
        emailVerified: null,
        imageUrl: null,
      },
    },
    context
  );
}

const beforeUpdateOne = (
  one: UserEntity,
  _body: UpdateOneUserBody,
  context: Context
) => selfOrThrow(context, one.id);

async function updateOne(
  one: UserEntity,
  body: UpdateOneUserBody,
  context: Context
): Promise<UserEntity> {
  const { name, imageUrl, email, emailCode } = body;

  const data: Partial<UserModel> = purify({ name, imageUrl });

  if (email && emailCode) {
    const emailUser = await UserEntity.findUnique(
      { where: { email } },
      context
    );
    if (emailUser !== null) {
      throw createHttpError.UnprocessableEntity(
        buildInvalidErrorMessage(
          'email',
          'unused_email',
          'already taken by another user'
        )
      );
    }
    const verificationToken =
      await NextauthVerificationTokenService.deleteOneSafe(
        { code: emailCode, email: email },
        context
      );
    if (verificationToken === null) {
      throw createHttpError.UnprocessableEntity(
        buildInvalidErrorMessage('emailCodeNotFound')
      );
    } else {
      data.email = email;
      data.emailVerified = context.time;
    }
  }

  purify(data);
  if (Object.keys(data).length > 0) {
    data.updatedAt = context.time;
    one.fromModel(data);
    await one.save();
  }
  return one;
}

async function deleteOne(
  one: UserEntity,
  context: Context
): Promise<UserEntity> {
  const functions: (() => Promise<number>)[] = [
    NextauthAccountService.deleteManyByUser,
    NextauthSessionService.deleteManyByUser,
    UserMemoryService.deleteManyByUser,
  ].map((fn) => () => fn(one.id, context));
  await sequential(functions);

  const where = { userId: one.id };
  const deletes: ((_params: {
    where: { userId: string };
  }) => Promise<{ count: number }>)[] = [];
  await Promise.all(deletes.map((fn) => fn({ where })));

  return await one.delete();
}

const UserService = {
  getMany,
  search,
  getOne,
  getOneSafe,
  findOrCreateOne,
  beforeUpdateOne,
  updateOne,
  deleteOne,
};

export default UserService;
