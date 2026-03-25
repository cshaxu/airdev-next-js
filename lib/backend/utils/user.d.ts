import { PackageUser } from '../types/data.js';
import { ContextUser } from '../../framework/context.js';
import { AdapterUser } from 'next-auth/adapters';
export type PackageNextauthUser = AdapterUser & {
    source: 'email' | 'google';
};
export declare function buildContextUserFromPackageUser(user: PackageUser): ContextUser;
export declare function buildNextauthUserFromPackageUser(user: PackageUser, source: PackageNextauthUser['source']): PackageNextauthUser;
