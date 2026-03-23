"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quantify = quantify;
exports.quantifyMany = quantifyMany;
exports.shorten = shorten;
exports.formatString = formatString;
exports.buildAddress = buildAddress;
exports.slugify = slugify;
exports.toTitleCase = toTitleCase;
const lodash_es_1 = require("lodash-es");
function pluralize(word) {
    if (typeof word !== 'string') {
        throw new Error('invalid word: string type is expected');
    }
    // Define some common rules for pluralization
    const pluralRules = [
        [/(ax|test|Ax|Test)is$/, '$1es'],
        [/(alias|status|Alias|Status)$/, '$1es'],
        [/(bu|Bu)s$/, '$1ses'],
        [/(buffal|tomat|Buffal|Tomat)o$/, '$1oes'],
        [/(hive|Hive)$/, '$1s'],
        [/(matr|vert|ind|Matr|Vert|Ind)ix|ex$/, '$1ices'],
        [/(octop|vir|Octoo|Vir)us$/, '$1i'],
        [/(quiz|Quiz)$/, '$1zes'],
        [/(x|ch|ss|sh)$/, '$1es'],
        [/([mlML])ouse$/, '$1ice'],
        [/([ti])um$/, '$1a'],
        [/([^aeiouy]|qu)y$/, '$1ies'],
        [/(?:([^f])fe|([lr])f)$/, '$1$2ves'],
        [/sis$/, 'ses'],
        [/s$/, 'es'],
        [/$/, 's'],
    ];
    // Check if the word matches any of the rules and apply the first matching rule
    for (const [pattern, replacement] of pluralRules) {
        if (pattern.test(word)) {
            return word.replace(pattern, replacement);
        }
    }
    return word + 's'; // If no rule matched, add 's' as a default pluralization
}
function quantify(count, singular, asDenominator = false, plural) {
    if (asDenominator && count === 1) {
        return `${singular}`;
    }
    const word = count === 1 ? singular : (plural ?? pluralize(singular));
    return `${count} ${word}`;
}
function quantifyMany(array) {
    if (array.length === 0) {
        return 'none';
    }
    const phrases = array
        .filter((v) => v.count !== 0)
        .map(({ count, singular, plural }) => quantify(count, singular, false, plural));
    if (phrases.length < 1) {
        const plurals = array.map(({ singular, plural }) => plural ?? pluralize(singular));
        const last = plurals.pop();
        return `no ${plurals.join(', ')} or ${last}`;
    }
    else if (phrases.length === 1) {
        return phrases[0];
    }
    else {
        const last = phrases.pop();
        return `${phrases.join(', ')} and ${last}`;
    }
}
function shorten(text, maxLength) {
    const trimmed = text.trim();
    if (trimmed.length <= maxLength) {
        return trimmed;
    }
    return trimmed.slice(0, maxLength - 3) + '...';
}
function formatString(template, defaultNameVars, data) {
    return template.replace(/\{([^}]+)\}/g, (match, path) => {
        const defaultValue = defaultNameVars[path];
        const keys = path.split('.');
        let value = data;
        for (const key of keys) {
            if ((0, lodash_es_1.isNil)(value)) {
                return defaultValue;
            }
            value = value[key];
        }
        if ((0, lodash_es_1.isNil)(value)) {
            return defaultValue;
        }
        else {
            return String(value);
        }
    });
}
function buildAddress(...addressParts) {
    return addressParts.filter((part) => part?.length).join(', ');
}
function slugify(value) {
    return value
        .toLowerCase()
        .replace(/[^A-Za-z0-9]/g, '')
        .trim();
}
function toTitleCase(value) {
    return value.trim().replace(/\b\w/g, (char) => char.toUpperCase());
}
//# sourceMappingURL=string.js.map