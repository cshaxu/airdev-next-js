import { pick } from 'lodash-es';
export function buildContextUserFromPackageUser(user) {
    return pick(user, ['id', 'name', 'email', 'createdAt', 'isAdmin']);
}
export function buildNextauthUserFromPackageUser(user, source) {
    return {
        ...pick(user, ['id', 'name', 'email', 'emailVerified']),
        image: user.imageUrl,
        source,
    };
}
//# sourceMappingURL=user.js.map