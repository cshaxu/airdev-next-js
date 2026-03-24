import { commonFunctionConfig } from '@/config/function/common';
import { wait } from '@airent/api';
const { logError } = commonFunctionConfig;
export async function retry(fn, retries, delay) {
    try {
        return await fn();
    }
    catch (error) {
        if (retries > 0) {
            logError(error, { retries, delay });
            await wait(delay);
            return retry(fn, retries - 1, delay);
        }
        throw error;
    }
}
export async function safe(fn, fallback) {
    try {
        return await fn();
    }
    catch (error) {
        logError(error);
        return fallback;
    }
}
export async function retrySafe(fn, retries, delay, fallback) {
    return await safe(() => retry(fn, retries, delay), fallback);
}
//# sourceMappingURL=process.js.map