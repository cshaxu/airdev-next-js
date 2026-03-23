import SystemRequestCacheService from '@/backend/services/data/system-request-cache';
import { Context } from '@/framework/context';
import { CommonResponse } from '@airent/api';

export const maxDuration = 60;

export const schedule = '0 0 * * *';

export const executor = (context: Context) =>
  SystemRequestCacheService.deleteMany(context.time).then(
    (count) => ({ code: 200, result: { count } }) as CommonResponse
  );
