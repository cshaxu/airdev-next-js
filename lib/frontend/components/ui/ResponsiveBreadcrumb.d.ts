import * as React from 'react';
export type BreadcrumbItem = {
    label: string;
    href?: string;
    icon?: React.ReactNode;
};
type Props = {
    items: BreadcrumbItem[];
    className?: string;
    renderItem?: (item: BreadcrumbItem) => React.ReactNode;
};
export declare function ResponsiveBreadcrumb({ items, className, renderItem }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ResponsiveBreadcrumb.d.ts.map