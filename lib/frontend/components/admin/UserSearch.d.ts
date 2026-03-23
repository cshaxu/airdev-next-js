import type { ApiClientAdapter } from '@airdev/next/adapter/frontend/api-client/types';
import type { ClientQueryAdapter } from '@airdev/next/adapter/frontend/query/types';
type Props = {
    becomeUser: ApiClientAdapter['becomeUser'];
    getManyUsersQueryOptions: ClientQueryAdapter['getManyUsersQueryOptions'];
    useUpdateOneUser: ClientQueryAdapter['useUpdateOneUser'];
};
export default function UserSearch({ becomeUser, getManyUsersQueryOptions, useUpdateOneUser, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=UserSearch.d.ts.map