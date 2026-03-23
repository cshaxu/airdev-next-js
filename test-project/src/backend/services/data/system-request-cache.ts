import { DB_DELAY_SECONDS } from '@/backend/config';
import { SystemRequestCacheEntity } from '@/backend/entities/system-request-cache';
import { mockContext } from '@/backend/lib/framework';
import { createHash } from '@/backend/utils/token';
import { Context } from '@/framework/context';
import { logError } from '@/framework/logging';
import { purify } from '@airent/api';
import { subSeconds } from 'date-fns';
import createHttpError from 'http-errors';
import { omit } from 'lodash-es';

async function deleteMany(time: Date): Promise<number> {
  const cutoff = subSeconds(time, DB_DELAY_SECONDS * 2);
  const where = { createdAt: { lte: cutoff } };
  const context = await mockContext();
  const many = await SystemRequestCacheEntity.findMany({ where }, context);
  if (many.length === 0) {
    return 0;
  }
  await Promise.all(many.map((one) => one.delete()));
  return many.length;
}

async function getOne(
  body: any,
  context: Context
): Promise<SystemRequestCacheEntity> {
  const id = await buildId(body, context);
  const one = await SystemRequestCacheEntity.findUnique(
    { where: { id } },
    context
  );
  if (one === null) {
    throw createHttpError.InternalServerError();
  }
  return one;
}

async function createOneSafe(
  body: any,
  context: Context
): Promise<SystemRequestCacheEntity | null> {
  const id = await buildId(body, context);
  try {
    return await SystemRequestCacheEntity.create(
      { data: { id, createdAt: context.time, request: body } },
      context
    );
  } catch (_err) {
    return null;
  }
}

async function updateOneSafe(
  one: SystemRequestCacheEntity,
  response: any,
  _context: Context
): Promise<SystemRequestCacheEntity | null> {
  try {
    one.fromModel({ completedAt: new Date(), response });
    return await one.save();
  } catch (error) {
    logError(error, {
      id: one.id,
      body: one.request,
      context: omit(one.context, 'headers'),
      response,
    });
    return null;
  }
}

async function buildId(body: any, context: Context): Promise<string> {
  const { time, method, url } = context;
  const chunk = Math.round(time.getTime() / (DB_DELAY_SECONDS * 1000));
  const object = purify({ chunk, method, url, body });
  return await createHash(JSON.stringify(object));
}

const SystemRequestCacheService = {
  getOne,
  createOneSafe,
  updateOneSafe,
  deleteMany,
};

export default SystemRequestCacheService;
