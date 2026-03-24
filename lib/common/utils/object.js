import { intersectionWith, isEqual, isNil } from 'lodash-es';
export const intersect = (a, b) => intersectionWith(a, b, isEqual).length > 0;
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
export function toSnakeCaseJson(obj) {
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
export function toCamelCaseJson(obj) {
    if (Array.isArray(obj)) {
        return obj.map(toCamelCaseJson);
    }
    else if (!isNil(obj) && obj.constructor === Object) {
        return Object.fromEntries(Object.entries(obj).map(([key, value]) => [
            toCamelCase(key),
            toCamelCaseJson(value),
        ]));
    }
    return obj;
}
export function mergeObjects(objects) {
    return objects.reduce((acc, obj) => ({ ...obj, ...acc }), {});
}
export function dedup(array, mapper) {
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
export function exclude(array, target, mapper) {
    const keys = new Set(target.map(mapper));
    return array.filter((item) => !keys.has(mapper(item)));
}
export function flattenObject(obj) {
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