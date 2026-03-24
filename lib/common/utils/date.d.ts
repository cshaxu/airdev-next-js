export declare function toDs(date?: Date): string;
export declare const toStartTime: (dateOrDs: Date | string) => Date;
export declare const toEndTime: (dateOrDs: Date | string) => Date;
export declare const addDsDays: (dateOrDs: Date | string, days: number) => string;
export declare const getLatestDs: () => string;
export declare const getCurrentDs: () => string;
export declare const compareDs: (ds1: Date | string, ds2: Date | string) => 0 | 1 | -1;
export declare function getDsArray(from: string, to: string): string[];
