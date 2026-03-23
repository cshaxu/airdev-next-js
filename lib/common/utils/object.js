"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersect = void 0;
exports.toSnakeCaseJson = toSnakeCaseJson;
exports.toCamelCaseJson = toCamelCaseJson;
exports.mergeObjects = mergeObjects;
exports.dedup = dedup;
exports.exclude = exclude;
exports.flattenObject = flattenObject;
const lodash_es_1 = require("lodash-es");
const intersect = (a, b) => (0, lodash_es_1.intersectionWith)(a, b, lodash_es_1.isEqual).length > 0;
exports.intersect = intersect;
function toSnakeCase(s) {
    return s
        .trim()
        .replace(/([a-z])([A-Z])/g, '$1_$2')
        .replace(/[-\s]+/g, '_')
        .toLowerCase();
}
function toCamelCase(s) {
    return s
        .trim()
        .replace(/[_\s-]+([a-zA-Z])/g, (_, letter) => letter.toUpperCase())
        .replace(/^(.)/, (match) => match.toLowerCase());
}
function toSnakeCaseJson(obj) {
    if (Array.isArray(obj)) {
        return obj.map(toSnakeCaseJson);
    }
    else if (obj !== null && obj.constructor === Object) {
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [
            toSnakeCase(key),
            toSnakeCaseJson(value),
        ]));
    }
    return obj;
}
function toCamelCaseJson(obj) {
    if (Array.isArray(obj)) {
        return obj.map(toCamelCaseJson);
    }
    else if (!(0, lodash_es_1.isNil)(obj) && obj.constructor === Object) {
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [
            toCamelCase(key),
            toCamelCaseJson(value),
        ]));
    }
    return obj;
}
function mergeObjects(objects) {
    return objects.reduce((acc, obj) => ({ ...obj, ...acc }), {});
}
function dedup(array, mapper) {
    const seen = new Set();
    const result = [];
    for (const item of array) {
        const key = mapper(item);
        if (!seen.has(key)) {
            seen.add(key);
            result.push(item);
        }
    }
    return result;
}
function exclude(array, target, mapper) {
    const keys = new Set(target.map(mapper));
    return array.filter((item) => !keys.has(mapper(item)));
}
function flattenObject(obj) {
    if (typeof obj !== 'object') {
        throw new Error('input must be a JSON object');
    }
    if (obj === null) {
        return {};
    }
    if (Array.isArray(obj)) {
        return obj.reduce((acc, o, i) => {
            acc[i.toString()] = flattenObject(o);
            return acc;
        }, {});
    }
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (typeof value === 'object' && value !== null) {
            const nested = flattenObject(value);
            Object.entries(nested).forEach(([nestedKey, nestedValue]) => {
                acc[`${key}.${nestedKey}`] = nestedValue;
            });
        }
        else {
            acc[key] = value;
        }
        return acc;
    }, {});
}
//# sourceMappingURL=object.js.map