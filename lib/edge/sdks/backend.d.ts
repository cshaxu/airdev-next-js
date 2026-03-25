import { ContextUser } from '../../framework/context.js';
export declare const getCurrentUser: (headers: Headers, isReal?: boolean) => Promise<ContextUser>;
export declare function buildHeaders(headers: Headers, options?: {
    additionalEntries?: Record<string, string | null>;
    excludedCookieKeys?: string[];
    excludedHeaderKeys?: string[];
}): Headers;
