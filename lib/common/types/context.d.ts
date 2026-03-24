export type BecomeBody = {
    userId: string | null;
};
export declare const CurrentUserFieldRequest: {
    id: boolean;
    email: boolean;
    name: boolean;
    imageUrl: boolean;
    isAdmin: boolean;
    createdAt: boolean;
};
export type CurrentUser = {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
    createdAt: Date;
    imageUrl: string | null;
};
