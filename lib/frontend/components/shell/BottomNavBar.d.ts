import type { ApiClientAdapter } from '@airdev/next/adapter/frontend/api-client/types';
import type { ShellNavItem } from '@airdev/next/adapter/frontend/shell/types';
type Props = {
    adminHref?: string;
    becomeUser: ApiClientAdapter['becomeUser'];
    logoutCallbackUrl: string;
    navItems: ShellNavItem[];
    settingsHref: string;
};
export default function BottomNavBar({ adminHref, becomeUser, logoutCallbackUrl, navItems, settingsHref, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=BottomNavBar.d.ts.map