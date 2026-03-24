import * as z from 'zod';
export declare const DEFAULT_TAKE: z.ZodOptional<z.ZodNumber>;
export declare const getTake: (query: {
    take?: number;
}, defaultPageSize?: number) => number;
