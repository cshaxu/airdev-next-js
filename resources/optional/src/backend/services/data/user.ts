import { UserEntity } from '@/backend/entities/user';
import {
  GetOneUserParams,
  SearchUsersQuery,
  UpdateOneUserBody,
} from '@/common/types/data/user';
import { UserModel } from '@/generated/types/user';
import {
  adminOrThrow,
  Context,
  selfOrThrow,
} from '@airdev/next/framework/context';
import {
  buildInvalidErrorMessage,
  buildMissingErrorMessage,
  purify,
} from '@airent/api';
import { sequential } from 'airent';
import createHttpError from 'http-errors';
import NextauthAccountService from './nextauth-account';
import NextauthSessionService from './nextauth-session';
import NextauthVerificationTokenService from './nextauth-verification-token';
import userSearchService from './user-search';

async function search(
  query: SearchUsersQuery,
  context: Context
): Promise<UserEntity[]> {
  return await userSearchService.search(query, context);
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

function beforeUpdateOne(
  one: UserEntity,
  body: UpdateOneUserBody,
  context: Context
): void {
  selfOrThrow(context, one.id);
  if (body.setAdmin === true) {
    adminOrThrow(context);
  }
}

async function updateOne(
  one: UserEntity,
  body: UpdateOneUserBody,
  context: Context
): Promise<UserEntity> {
  const { name, imageUrl, email, emailCode, setAdmin } = body;

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

  if (setAdmin !== undefined) {
    if (one.isAdminRaw === false && one.getIsAdmin()) {
      data.isAdmin = true;
    } else {
      data.isAdmin = setAdmin;
    }
  }

  purify(data);
  if (Object.keys(data).length > 0) {
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
  ].map((fn) => () => fn(one.id, context));
  await sequential(functions);
  return await one.delete();
}

async function getOrCreateOne(
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
  return await UserEntity.create({ data: { name: email, email } }, context);
}

async function getOneByEmailSafe(
  email: string,
  context: Context
): Promise<UserEntity | null> {
  return await UserEntity.findUnique({ where: { email } }, context);
}

async function updateOneInternal(
  id: string,
  data: Partial<UserModel>,
  context: Context
): Promise<UserEntity | null> {
  const one = await UserEntity.findUnique({ where: { id } }, context);
  if (one === null) {
    throw createHttpError.NotFound(buildMissingErrorMessage('User', { id }));
  }
  purify(data);
  if (Object.keys(data).length > 0) {
    one.fromModel(data);
    await one.save();
  }
  return one;
}

const UserService = {
  search,
  getOne,
  getOneSafe,
  beforeUpdateOne,
  updateOne,
  deleteOne,
  // for package only
  getOneByEmailSafe,
  getOrCreateOne,
  updateOneInternal,
};

export default UserService;
