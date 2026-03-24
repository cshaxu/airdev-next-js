export declare function withRetry<T>(func: () => Promise<T>, retry: number): Promise<T>;
