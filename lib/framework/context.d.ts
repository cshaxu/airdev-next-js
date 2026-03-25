import { CurrentUser } from '../common/types/context';
export declare const ContextUserFieldRequest: {
    id: boolean;
    email: boolean;
    name: boolean;
    isAdmin: boolean;
    createdAt: boolean;
};
export type ContextUser = Pick<CurrentUser, 'id' | 'email' | 'name' | 'isAdmin' | 'createdAt'>;
export type Context = {
    time: Date;
    method: string;
    url: string;
    headers: Headers;
    currentUser: ContextUser | null;
};
export declare function adminOrThrow(context: Context): void;
export declare function selfOrThrow(context: Context, userId: string): void;
export declare function isSelfOrAdmin(context: Context, userId: string): boolean;
export declare function isAdmin(context: Context): boolean;
export declare function isSelf(context: Context, userId: string): boolean;
