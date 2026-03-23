import { Context } from '@airdev/next/framework/context';
import { CommonResponse } from '@airent/api';
import { Awaitable } from 'airent';
export declare function batchExecuteByPageParam<ENTITY, RESULT, PAGE_PARAM>(loader: (pageParam: PAGE_PARAM | undefined, batchSize: number) => Promise<ENTITY[]>, executor: (array: ENTITY[], previousResults: RESULT[]) => Promise<RESULT[]>, pageParamMapper: (entity: ENTITY) => PAGE_PARAM, batchSize?: number, initialPageParam?: PAGE_PARAM | undefined): Promise<RESULT[]>;
type BatchLoader<ENTITY, PAGE_PARAM> = (pageParam: PAGE_PARAM | undefined, batchSize: number) => Promise<ENTITY[]>;
export declare function batchFindFilteredMany<ENTITY, PAGE_PARAM>(loader: BatchLoader<ENTITY, PAGE_PARAM>, pageParamMapper: (entity: ENTITY) => PAGE_PARAM, filter: (entity: ENTITY) => Promise<boolean>, initialPageParam: PAGE_PARAM | undefined, pageSize: number, batchSize?: number): Promise<ENTITY[]>;
export declare function filterAsync<T>(array: T[], filter: (object: T) => Promise<boolean>, batchSize?: number): Promise<T[]>;
export declare function batchFindMultipleMany<ENTITY, PAGE_PARAM>(loaders: BatchLoader<ENTITY, PAGE_PARAM>[], pageParamMapper: (entity: ENTITY) => PAGE_PARAM, pageParamComparator: (a: PAGE_PARAM, b: PAGE_PARAM) => number, initialPageParam: PAGE_PARAM | undefined, pageSize: number): Promise<ENTITY[]>;
export type BatchExecuteOneOptions = {
    batchSize?: number;
    isSequential?: boolean;
    isVerbose?: boolean;
};
export declare function batchExecuteOneByPageParam<ENTITY, RESULT, PAGE_PARAM>(loader: (pageParam: PAGE_PARAM | undefined, batchSize: number) => Promise<ENTITY[]>, pageParamMapper: (entity: ENTITY) => PAGE_PARAM, oneExecutor: (one: ENTITY) => Promise<RESULT>, reducer: (results: RESULT[]) => Awaitable<CommonResponse>, options?: BatchExecuteOneOptions): Promise<CommonResponse>;
export declare const backfillByPageParamWith: <ENTITY, PARAMS, PAGE_PARAM>(batchLoader: (params: PARAMS, context: Context, pageParam: PAGE_PARAM | undefined, batchSize: number) => Promise<ENTITY[]>, pageParamMapper: (entity: ENTITY) => PAGE_PARAM, oneExecutor: (one: ENTITY, params: PARAMS, context: Context) => Promise<boolean>, options?: BatchExecuteOneOptions) => (params: PARAMS, context: Context) => Promise<CommonResponse>;
export {};
//# sourceMappingURL=data.d.ts.map