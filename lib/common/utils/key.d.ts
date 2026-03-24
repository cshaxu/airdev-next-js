export declare const getObjectTypeFrom: <T>(objectKey: string) => () => T;
export declare const getObjectType: <T>(objectKey: string) => T;
export declare const getObjectIdFrom: (objectKey: string) => () => string;
export declare const getObjectId: (objectKey: string) => string;
export declare const buildObjectKeyWith: <T>(objectType: T, objectId: string) => () => string;
export declare const buildObjectKey: <T>(objectType: T, objectId: string) => string;
