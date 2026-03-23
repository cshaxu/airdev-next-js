export declare const intersect: <T>(a: T[], b: T[]) => boolean;
export type DeepNonNullable<T> = {
    [K in keyof T]: T[K] extends object ? DeepNonNullable<Exclude<T[K], null>> : Exclude<T[K], null>;
};
export declare function toSnakeCaseJson(obj: any): any;
export declare function toCamelCaseJson(obj: any): any;
export declare function mergeObjects<T>(objects: T[]): T;
export declare function dedup<T>(array: T[], mapper: (item: T) => string): T[];
export declare function exclude<T>(array: T[], target: T[], mapper: (item: T) => string): T[];
export declare function flattenObject(obj: object): Record<string, any>;
//# sourceMappingURL=object.d.ts.map