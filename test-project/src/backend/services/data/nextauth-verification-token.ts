import { NEXTAUTH_SECRET } from '@/backend/config';
import * as AuthDelivery from '@/backend/deliveries/auth';
import { NextauthVerificationTokenEntity } from '@/backend/entities/nextauth-verification-token';
import { createHash, generateCode } from '@/backend/utils/token';
import {
  CreateOneNextauthVerificationTokenBody,
  GetOneNextauthVerificationTokenParams,
} from '@/common/types/data/nextauth-verification-token';
import { Context } from '@/framework/context';
import { addMinutes } from 'date-fns';

// Note: https://github.com/nextauthjs/next-auth/blame/main/packages/core/src/lib/actions/signin/send-token.ts#L80
async function buildKey(
  email: string,
  code: string
): Promise<{ identifier: string; token: string }> {
  const token = await createHash(`${code}${NEXTAUTH_SECRET}`);
  const identifier = email;
  return { identifier, token };
}

async function getOneSafe(
  params: GetOneNextauthVerificationTokenParams,
  context: Context
): Promise<NextauthVerificationTokenEntity | null> {
  const { email, code } = params;
  const key = await buildKey(email, code);
  const one = await NextauthVerificationTokenEntity.findUnique(
    { where: key },
    context
  );
  if (one === null) {
    return null;
  }
  if (one.expires.getTime() < context.time.getTime()) {
    return null;
  }
  return one;
}

async function createOne(
  body: CreateOneNextauthVerificationTokenBody,
  context: Context
): Promise<NextauthVerificationTokenEntity> {
  const { email } = body;
  const code = generateCode(5, '123456789');
  const key = await buildKey(email, code);
  const expires = addMinutes(context.time, 15);
  await AuthDelivery.sendEmail(code, key.identifier);
  const one = await NextauthVerificationTokenEntity.findUnique(
    { where: key },
    context
  );
  if (one !== null) {
    one.expires = expires;
    return await one.save();
  }
  return await NextauthVerificationTokenEntity.create(
    { data: { ...key, expires } },
    context
  );
}

async function deleteOneSafe(
  params: GetOneNextauthVerificationTokenParams,
  context: Context
): Promise<NextauthVerificationTokenEntity | null> {
  const one = await getOneSafe(params, context);
  if (one === null) {
    return null;
  }
  const { identifier, token } = one;
  return await NextauthVerificationTokenEntity.delete(
    { where: { identifier, token } },
    context
  );
}

const NextauthVerificationTokenService = {
  getOneSafe,
  createOne,
  deleteOneSafe,
};

export default NextauthVerificationTokenService;
