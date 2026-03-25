import { CurrentUser } from '../../../common/types/context.js';
export declare const currentUserServerQueryOptions: {
    queryKey: string[];
    queryFn: () => Promise<CurrentUser | null>;
};
