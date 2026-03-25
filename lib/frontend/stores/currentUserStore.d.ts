import { CurrentUser } from '../../common/types/context.js';
export declare const useCurrentUser: () => CurrentUser | undefined;
export declare const useSetUser: () => (user: CurrentUser | undefined) => void;
