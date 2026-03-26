import { publicConfig } from '@/config/json/public';
import * as z from 'zod';
export const DEFAULT_TAKE = z
    .number()
    .int()
    .positive()
    .max(publicConfig.defaults.apiBatchSize)
    .optional();
export const getTake = (query, defaultPageSize = publicConfig.defaults.pageSize) => query.take ?? defaultPageSize;
//# sourceMappingURL=zod.js.map