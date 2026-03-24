export declare function quantify(count: number, singular: string, asDenominator?: boolean, plural?: string): string;
type QuantifyParams = {
    count: number;
    singular: string;
    plural?: string;
};
export declare function quantifyMany(array: QuantifyParams[]): string;
export declare function shorten(text: string, maxLength: number): string;
export declare function formatString(template: string, defaultNameVars: Record<string, string>, data: Record<string, any>): string;
export declare function buildAddress(...addressParts: (string | undefined | null)[]): string;
export declare function slugify(value: string): string;
export declare function toTitleCase(value: string): string;
export {};
