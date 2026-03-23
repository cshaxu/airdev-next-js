"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retry = retry;
exports.safe = safe;
exports.retrySafe = retrySafe;
const framework_1 = require("@airdev/next/adapter/backend/framework");
const api_1 = require("@airent/api");
async function retry(fn, retries, delay) {
    try {
        return await fn();
    }
    catch (error) {
        if (retries > 0) {
            framework_1.frameworkAdapter.logError(error, { retries, delay });
            await (0, api_1.wait)(delay);
            return retry(fn, retries - 1, delay);
        }
        throw error;
    }
}
async function safe(fn, fallback) {
    try {
        return await fn();
    }
    catch (error) {
        framework_1.frameworkAdapter.logError(error);
        return fallback;
    }
}
async function retrySafe(fn, retries, delay, fallback) {
    return await safe(() => retry(fn, retries, delay), fallback);
}
//# sourceMappingURL=process.js.map