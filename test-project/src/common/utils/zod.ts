import { DEFAULT_API_BATCH_SIZE, DEFAULT_PAGE_SIZE } from '@/common/config';
import * as z from 'zod';

export const DEFAULT_TAKE = z
  .number()
  .int()
  .positive()
  .max(DEFAULT_API_BATCH_SIZE)
  .optional();

export const getTake = (query: { take?: number }) =>
  query.take ?? DEFAULT_PAGE_SIZE;
