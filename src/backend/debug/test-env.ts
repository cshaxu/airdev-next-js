import { DATA_ENVIRONMENT, SERVICE_ENVIRONMENT } from '@/common/config';
import { CommonResponse, parseBodyWith } from '@airent/api';
import * as z from 'zod';

export const Params = z.object({});
export type Params = z.infer<typeof Params>;

export const parser = parseBodyWith(Params);

export const executor = (_params: Params) =>
  ({
    code: 200,
    result: {
      serviceEnvironment: SERVICE_ENVIRONMENT,
      dataEnvironment: DATA_ENVIRONMENT,
    },
  }) as CommonResponse;
