import { CurrentUser } from '../../../common/types/context.js';
export declare const useRequiredCurrentUser: () => import("@tanstack/react-query").UseSuspenseQueryResult<CurrentUser, Error>;
export declare const useNullableCurrentUser: () => import("@tanstack/react-query").UseQueryResult<CurrentUser | null, Error>;
