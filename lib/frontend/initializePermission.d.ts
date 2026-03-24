import { QueryClient } from '@tanstack/react-query';
export declare function initializePermission(queryClient: QueryClient): Promise<{
    currentUser: any;
}>;
