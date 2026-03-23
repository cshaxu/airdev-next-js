"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.backfillByPageParamWith = void 0;
exports.batchExecuteByPageParam = batchExecuteByPageParam;
exports.batchFindFilteredMany = batchFindFilteredMany;
exports.filterAsync = filterAsync;
exports.batchFindMultipleMany = batchFindMultipleMany;
exports.batchExecuteOneByPageParam = batchExecuteOneByPageParam;
const config_1 = require("@airdev/next/backend/config");
const api_1 = require("@airent/api");
const airent_1 = require("airent");
const http_errors_1 = __importDefault(require("http-errors"));
async function batchExecuteByPageParam(loader, executor, pageParamMapper, batchSize = config_1.privateConfig.defaultDbBatchSize, initialPageParam = undefined) {
    let pageParam = initialPageParam;
    const result = [];
    let batch = [];
    do {
        batch = await loader(pageParam, batchSize);
        const expected = batch.length;
        const executed = await executor(batch, result);
        const actual = executed.length;
        if (actual !== expected) {
            throw http_errors_1.default.InternalServerError((0, api_1.buildInvalidErrorMessage)('batch', expected, actual));
        }
        const last = batch.at(-1);
        pageParam = last ? pageParamMapper(last) : pageParam;
        result.push(...executed);
    } while (batch.length === batchSize);
    return result;
}
async function batchFindFilteredMany(loader, pageParamMapper, filter, initialPageParam, pageSize, batchSize = config_1.privateConfig.defaultApiBatchSize) {
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
async function filterAsync(array, filter, batchSize = config_1.privateConfig.defaultDbBatchSize) {
    const result = [];
    for (let i = 0; i < array.length; i += batchSize) {
        const batch = array.slice(i, i + batchSize);
        const conditions = await Promise.all(batch.map(filter));
        const filtered = batch.filter((_, index) => conditions[index]);
        result.push(...filtered);
    }
    return result;
}
async function batchFindMultipleMany(loaders, pageParamMapper, pageParamComparator, initialPageParam, pageSize) {
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
async function batchExecuteOneByPageParam(loader, pageParamMapper, oneExecutor, reducer, options = {}) {
    const batchSize = options.batchSize ?? config_1.privateConfig.defaultDbBatchSize;
    const isSequential = options.isSequential ?? false;
    const isVerbose = options.isVerbose ?? true;
    const executor = async (array, previous) => {
        let current;
        if (isSequential) {
            const functions = array.map((one) => () => oneExecutor(one));
            current = await (0, airent_1.sequential)(functions);
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
            (0, api_1.logInfo)(logParams);
        }
        return current;
    };
    const results = await batchExecuteByPageParam(loader, executor, pageParamMapper, batchSize);
    const result = await reducer(results);
    return { code: 200, result };
}
const backfillByPageParamWith = (batchLoader, pageParamMapper, oneExecutor, options = {}) => (params, context) => batchExecuteOneByPageParam((pageParam, batchSize) => batchLoader(params, context, pageParam, batchSize), pageParamMapper, (one) => oneExecutor(one, params, context), (results) => ({
    code: 200,
    result: {
        total: results.length,
        success: results.filter(Boolean).length,
    },
}), options);
exports.backfillByPageParamWith = backfillByPageParamWith;
//# sourceMappingURL=data.js.map