import type { ClientQueryAdapter } from '@airdev/next/adapter/frontend/query/types';
import { ReactNode } from 'react';
type Props = {
    children?: ReactNode;
    homeHref: string;
    logoutCallbackUrl: string;
    useDeleteOneUser: ClientQueryAdapter['useDeleteOneUser'];
    useUpdateOneUser: ClientQueryAdapter['useUpdateOneUser'];
};
export default function Settings({ children, homeHref, logoutCallbackUrl, useDeleteOneUser, useUpdateOneUser, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Settings.d.ts.map