"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockContext = mockContext;
exports.adminOrThrow = adminOrThrow;
exports.selfOrThrow = selfOrThrow;
exports.isSelfOrAdmin = isSelfOrAdmin;
exports.isAdmin = isAdmin;
exports.isSelf = isSelf;
const api_1 = require("@airent/api");
const http_errors_1 = __importDefault(require("http-errors"));
const headers_1 = require("next/headers");
async function mockContext(context) {
    const headers = context?.headers ?? (await (0, headers_1.headers)());
    return {
        time: context?.time ?? new Date(),
        method: context?.method ?? '',
        url: context?.url ?? '',
        headers,
        currentUser: context?.currentUser ?? null,
    };
}
function adminOrThrow(context) {
    if (!isAdmin(context)) {
        throw http_errors_1.default.Forbidden((0, api_1.buildInvalidErrorMessage)('access'));
    }
}
function selfOrThrow(context, userId) {
    if (!isSelf(context, userId)) {
        adminOrThrow(context);
    }
}
function isSelfOrAdmin(context, userId) {
    return isSelf(context, userId) || isAdmin(context);
}
function isAdmin(context) {
    return !!context.currentUser?.isAdmin;
}
function isSelf(context, userId) {
    return context.currentUser?.id === userId;
}
//# sourceMappingURL=context.js.map