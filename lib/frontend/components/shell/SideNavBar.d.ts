import type { ApiClientAdapter } from '@airdev/next/adapter/frontend/api-client/types';
import type { ShellNavItem } from '@airdev/next/adapter/frontend/shell/types';
type Props = {
    adminHref?: string;
    appName: string;
    becomeUser: ApiClientAdapter['becomeUser'];
    logoSrc: string;
    logoutCallbackUrl: string;
    navItems: ShellNavItem[];
    settingsHref: string;
    shouldAutoCollapse?: (pathname: string) => boolean;
};
export default function SideNavBar({ adminHref, appName, becomeUser, logoSrc, logoutCallbackUrl, navItems, settingsHref, shouldAutoCollapse, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SideNavBar.d.ts.map