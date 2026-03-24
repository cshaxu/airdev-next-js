export interface BecameUser {
    id: string;
    name: string;
    imageUrl: string | null;
    isAdmin: boolean;
}
export declare const useBecameUser: () => BecameUser | null;
export declare const useSetBecameUser: () => (user: BecameUser | null) => void;
