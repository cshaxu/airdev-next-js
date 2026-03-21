import { privateConfig } from '@/backend/config';
import * as z from 'zod';

export const DEFAULT_TAKE = z
  .number()
  .int()
  .positive()
  .max(privateConfig.defaultApiBatchSize)
  .optional();

export const getTake = (query: { take?: number }) =>
  query.take ?? privateConfig.defaultPageSize;
