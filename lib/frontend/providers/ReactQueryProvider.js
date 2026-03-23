"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReactQueryProvider;
const jsx_runtime_1 = require("react/jsx-runtime");
const useIsBrowser_1 = __importDefault(require("@airdev/next/frontend/hooks/useIsBrowser"));
const react_query_1 = require("@tanstack/react-query");
const react_query_devtools_1 = require("@tanstack/react-query-devtools");
function makeQueryClient() {
    return new react_query_1.QueryClient({
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
    if (react_query_1.isServer) {
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
function ReactQueryProvider({ children }) {
    // NOTE: Avoid useState when initializing the query client if you don't
    //       have a suspense boundary between this and the code that may
    //       suspend because React will throw away the client on the initial
    //       render if it suspends and there is no boundary
    const queryClient = getQueryClient();
    const isBrowser = (0, useIsBrowser_1.default)();
    return ((0, jsx_runtime_1.jsxs)(react_query_1.QueryClientProvider, { client: queryClient, children: [children, isBrowser && (0, jsx_runtime_1.jsx)(react_query_devtools_1.ReactQueryDevtools, { initialIsOpen: false })] }));
}
//# sourceMappingURL=ReactQueryProvider.js.map