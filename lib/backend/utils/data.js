import { privateConfig } from '@/config/json/private';
import { publicConfig } from '@/config/json/public';
import { buildInvalidErrorMessage, logInfo } from '@airent/api';
import { sequential } from 'airent';
import createHttpError from 'http-errors';
export async function batchExecuteByPageParam(loader, executor, pageParamMapper, batchSize = privateConfig.database.batchSize, initialPageParam = undefined) {
    let pageParam = initialPageParam;
    const result = [];
    let batch = [];
    do {
        batch = await loader(pageParam, batchSize);
        const expected = batch.length;
        const executed = await executor(batch, result);
        const actual = executed.length;
        if (actual !== expected) {
            throw createHttpError.InternalServerError(buildInvalidErrorMessage('batch', expected, actual));
        }
        const last = batch.at(-1);
        pageParam = last ? pageParamMapper(last) : pageParam;
        result.push(...executed);
    } while (batch.length === batchSize);
    return result;
}
export async function batchFindFilteredMany(loader, pageParamMapper, filter, initialPageParam, pageSize, batchSize = publicConfig.defaults.apiBatchSize) {
    const result = [];
    let batch = [];
    let pageParam = initialPageParam;
    let remainingPageSize = pageSize;
    do {
        batch = await loader(pageParam, batchSize);
        const last = batch.at(-1);
        pageParam = last ? pageParamMapper(last) : undefined;
        const filtered = await filterAsync(batch, filter, batchSize);
        const selected = filtered.slice(0, remainingPageSize);
        result.push(...selected);
        remainingPageSize -= selected.length;
    } while (remainingPageSize > 0 && batch.length > 0);
    return result;
}
export async function filterAsync(array, filter, batchSize = privateConfig.database.batchSize) {
    const result = [];
    for (let i = 0; i < array.length; i += batchSize) {
        const batch = array.slice(i, i + batchSize);
        const conditions = await Promise.all(batch.map(filter));
        const filtered = batch.filter((_, index) => conditions[index]);
        result.push(...filtered);
    }
    return result;
}
export async function batchFindMultipleMany(loaders, pageParamMapper, pageParamComparator, initialPageParam, pageSize) {
    const initialPages = await Promise.all(loaders.map((loader) => loader(initialPageParam, pageSize)));
    let streams = loaders
        .map((loader, i) => ({ loader, page: initialPages[i] }))
        .filter((stream) => stream.page.length > 0);
    const result = [];
    while (streams.length > 0 && result.length < pageSize) {
        const maxStream = streams.reduce((acc, stream) => acc &&
            pageParamComparator(pageParamMapper(acc.page[0]), pageParamMapper(stream.page[0])) < 0
            ? acc
            : stream, undefined);
        const entity = maxStream.page.shift();
        result.push(entity);
        if (maxStream.page.length === 0) {
            maxStream.page = await maxStream.loader(pageParamMapper(entity), pageSize);
        }
        streams = streams.filter((stream) => stream.page.length > 0);
    }
    return result;
}
export async function batchExecuteOneByPageParam(loader, pageParamMapper, oneExecutor, reducer, options = {}) {
    const batchSize = options.batchSize ?? privateConfig.database.batchSize;
    const isSequential = options.isSequential ?? false;
    const isVerbose = options.isVerbose ?? true;
    const executor = async (array, previous) => {
        let current;
        if (isSequential) {
            const functions = array.map((one) => () => oneExecutor(one));
            current = await sequential(functions);
        }
        else {
            const promises = array.map((one) => oneExecutor(one));
            current = await Promise.all(promises);
        }
        if (isVerbose) {
            const logParams = {
                previousTotal: previous.length,
                currentTotal: current.length,
                currentSuccess: current.filter(Boolean).length,
            };
            logInfo(logParams);
        }
        return current;
    };
    const results = await batchExecuteByPageParam(loader, executor, pageParamMapper, batchSize);
    const result = await reducer(results);
    return { code: 200, result };
}
export const backfillByPageParamWith = (batchLoader, pageParamMapper, oneExecutor, options = {}) => (params, context) => batchExecuteOneByPageParam((pageParam, batchSize) => batchLoader(params, context, pageParam, batchSize), pageParamMapper, (one) => oneExecutor(one, params, context), (results) => ({
    code: 200,
    result: {
        total: results.length,
        success: results.filter(Boolean).length,
    },
}), options);
//# sourceMappingURL=data.js.map