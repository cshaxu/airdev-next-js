import { PackageUser } from '@/backend/types/data';
import { ContextUser } from '@/framework/context';
import { pick } from 'lodash-es';
import { AdapterUser } from 'next-auth/adapters';

export type PackageNextauthUser = AdapterUser & {
  source: 'email' | 'google';
};

export function buildContextUserFromPackageUser(
  user: PackageUser
): ContextUser {
  return pick(user, ['id', 'name', 'email', 'createdAt', 'isAdmin']);
}

export function buildNextauthUserFromPackageUser(
  user: PackageUser,
  source: PackageNextauthUser['source']
): PackageNextauthUser {
  return {
    ...pick(user, ['id', 'name', 'email', 'emailVerified']),
    image: user.imageUrl,
    source,
  };
}
