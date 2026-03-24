import { buildInvalidErrorMessage } from '@airent/api';
import createHttpError from 'http-errors';
export function adminOrThrow(context) {
    if (!isAdmin(context)) {
        throw createHttpError.Forbidden(buildInvalidErrorMessage('access'));
    }
}
export function selfOrThrow(context, userId) {
    if (!isSelf(context, userId)) {
        adminOrThrow(context);
    }
}
export function isSelfOrAdmin(context, userId) {
    return isSelf(context, userId) || isAdmin(context);
}
export function isAdmin(context) {
    return !!context.currentUser?.isAdmin;
}
export function isSelf(context, userId) {
    return context.currentUser?.id === userId;
}
//# sourceMappingURL=context.js.map