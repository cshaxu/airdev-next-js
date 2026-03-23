"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHash = createHash;
exports.generateCode = generateCode;
// Note: https://github.com/nextauthjs/next-auth/blob/main/packages/core/src/lib/utils/web.ts#L95
/** Web compatible method to create a hash, using SHA256 */
async function createHash(message) {
    const data = new TextEncoder().encode(message);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
        .toString();
}
function generateCode(length, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
}
//# sourceMappingURL=token.js.map