import type { ApiClientAdapter } from '@airdev/next/adapter/frontend/api-client/types';
type SidebarProps = {
    mode: 'sidebar';
    isFull: boolean;
};
type BottomNavProps = {
    mode: 'bottom-nav';
    showLabel: boolean;
};
type Props = SidebarProps | BottomNavProps;
type SharedProps = {
    adminHref?: string;
    becomeUser: ApiClientAdapter['becomeUser'];
    logoutCallbackUrl: string;
    settingsHref: string;
};
export default function UserButton(props: Props & SharedProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=UserButton.d.ts.map