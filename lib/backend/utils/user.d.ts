import { PackageUser } from '../types/data';
import { ContextUser } from '../../framework/context';
import { AdapterUser } from 'next-auth/adapters';
export type PackageNextauthUser = AdapterUser & {
    source: 'email' | 'google';
};
export declare function buildContextUserFromPackageUser(user: PackageUser): ContextUser;
export declare function buildNextauthUserFromPackageUser(user: PackageUser, source: PackageNextauthUser['source']): PackageNextauthUser;
