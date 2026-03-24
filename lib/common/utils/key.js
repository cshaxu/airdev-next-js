export const getObjectTypeFrom = (objectKey) => () => getObjectType(objectKey);
export const getObjectType = (objectKey) => objectKey.split(':')[0];
export const getObjectIdFrom = (objectKey) => () => getObjectId(objectKey);
export const getObjectId = (objectKey) => objectKey.split(':')[1];
export const buildObjectKeyWith = (objectType, objectId) => () => buildObjectKey(objectType, objectId);
export const buildObjectKey = (objectType, objectId) => `${objectType}:${objectId}`;
//# sourceMappingURL=key.js.map