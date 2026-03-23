"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildObjectKey = exports.buildObjectKeyWith = exports.getObjectId = exports.getObjectIdFrom = exports.getObjectType = exports.getObjectTypeFrom = void 0;
const getObjectTypeFrom = (objectKey) => () => (0, exports.getObjectType)(objectKey);
exports.getObjectTypeFrom = getObjectTypeFrom;
const getObjectType = (objectKey) => objectKey.split(':')[0];
exports.getObjectType = getObjectType;
const getObjectIdFrom = (objectKey) => () => (0, exports.getObjectId)(objectKey);
exports.getObjectIdFrom = getObjectIdFrom;
const getObjectId = (objectKey) => objectKey.split(':')[1];
exports.getObjectId = getObjectId;
const buildObjectKeyWith = (objectType, objectId) => () => (0, exports.buildObjectKey)(objectType, objectId);
exports.buildObjectKeyWith = buildObjectKeyWith;
const buildObjectKey = (objectType, objectId) => `${objectType}:${objectId}`;
exports.buildObjectKey = buildObjectKey;
//# sourceMappingURL=key.js.map