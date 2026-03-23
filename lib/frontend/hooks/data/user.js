"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRequiredCurrentUser = exports.useNullableCurrentUser = void 0;
const api_client_1 = require("@airdev/next/adapter/frontend/api-client");
const react_query_1 = require("@tanstack/react-query");
const currentUserQueryOptions = {
    queryKey: ['currentUser'],
    retry: false,
    staleTime: 60 * 1000 * 5,
};
const nullableCurrentUserQueryOptions = (0, react_query_1.queryOptions)({
    ...currentUserQueryOptions,
    queryFn: api_client_1.apiClientAdapter.getNullableCurrentUser,
});
const useNullableCurrentUser = () => (0, react_query_1.useQuery)(nullableCurrentUserQueryOptions);
exports.useNullableCurrentUser = useNullableCurrentUser;
const requiredCurrentUserQueryOptions = (0, react_query_1.queryOptions)({
    ...currentUserQueryOptions,
    queryFn: () => api_client_1.apiClientAdapter.getNullableCurrentUser().then((user) => {
        if (user === null) {
            throw new Error('A visitor should not access this page');
        }
        return user;
    }),
});
const useRequiredCurrentUser = () => (0, react_query_1.useSuspenseQuery)(requiredCurrentUserQueryOptions);
exports.useRequiredCurrentUser = useRequiredCurrentUser;
//# sourceMappingURL=user.js.map