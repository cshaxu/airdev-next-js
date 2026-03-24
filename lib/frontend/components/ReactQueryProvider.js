'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { isServer, QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';
function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
            },
        },
    });
}
let browserQueryClient = undefined;
function getQueryClient() {
    if (isServer) {
        // Server: always make a new query client
        return makeQueryClient();
    }
    else {
        // Browser: make a new query client if we don't already have one
        // This is very important, so we don't re-make a new client if React
        // suspends during the initial render. This may not be needed if we
        // have a suspense boundary BELOW the creation of the query client
        if (!browserQueryClient) {
            browserQueryClient = makeQueryClient();
        }
        return browserQueryClient;
    }
}
function useIsBrowser() {
    const [isBrowser, setIsBrowser] = useState(false);
    useEffect(() => {
        setIsBrowser(true);
    }, []);
    return isBrowser;
}
export default function ReactQueryProvider({ children }) {
    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary
    const queryClient = getQueryClient();
    const isBrowser = useIsBrowser();
    return (_jsxs(QueryClientProvider, { client: queryClient, children: [children, isBrowser && _jsx(ReactQueryDevtools, { initialIsOpen: false })] }));
}
//# sourceMappingURL=ReactQueryProvider.js.map