"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = withRetry;
async function withRetry(func, retry) {
    while (true) {
        try {
            return await func();
        }
        catch (error) {
            if (retry > 0) {
                retry--;
            }
            else {
                throw error;
            }
        }
    }
}
//# sourceMappingURL=function.js.map