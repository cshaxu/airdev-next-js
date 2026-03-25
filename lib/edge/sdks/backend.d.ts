export declare const getCurrentUser: (headers: Headers, isReal?: boolean) => Promise<any>;
export declare function buildHeaders(headers: Headers, options?: {
    additionalEntries?: Record<string, string | null>;
    excludedCookieKeys?: string[];
    excludedHeaderKeys?: string[];
}): Headers;
