export type ContextUser = {
    id: string;
    email: string;
    name: string;
    imageUrl: string | null;
    isAdmin: boolean;
    createdAt: Date;
};
export type Context = {
    time: Date;
    method: string;
    url: string;
    headers: Headers;
    currentUser: ContextUser | null;
};
export declare function mockContext(context?: Partial<Context>): Promise<Context>;
export declare function adminOrThrow(context: Context): void;
export declare function selfOrThrow(context: Context, userId: string): void;
export declare function isSelfOrAdmin(context: Context, userId: string): boolean;
export declare function isAdmin(context: Context): boolean;
export declare function isSelf(context: Context, userId: string): boolean;
//# sourceMappingURL=context.d.ts.map