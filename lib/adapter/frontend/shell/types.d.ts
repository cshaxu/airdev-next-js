import type { ComponentType, ReactNode } from 'react';
export type AdminTabItem = {
    href: string;
    key: string;
    label: string;
    match?: (pathname: string) => boolean;
};
export type ShellNavItem = {
    href: string;
    key: string;
    label: string;
    match?: (pathname: string) => boolean;
    renderIcon: (className: string) => ReactNode;
};
export type ShellNavigationAdapter = {
    primaryItems: ShellNavItem[];
    adminTabItems: AdminTabItem[];
    shouldAutoCollapse?: (pathname: string) => boolean;
    homeHref: string;
    adminHref: string;
    settingsHref: string;
    privacyHref: string;
    termsHref: string;
    logoutCallbackUrl: string;
};
export type ShellComponentAdapter = {
    logoSrc: string;
    LandingComponent: ComponentType;
    AirentApiNextStudioComponent: ComponentType;
};
export type ShellAdapter = {
    navigation: ShellNavigationAdapter;
    component: ShellComponentAdapter;
};
//# sourceMappingURL=types.d.ts.map