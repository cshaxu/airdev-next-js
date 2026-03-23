import { ReactNodeProps } from '@airdev/next/frontend/types/props';
export type HeaderBarItem = {
    label: string;
    href?: string;
    icon?: React.ReactNode;
};
type Props = Partial<ReactNodeProps> & {
    items?: HeaderBarItem[];
    isLoading?: boolean;
    actions?: React.ReactNode;
};
export default function HeaderBar({ children, items, isLoading, actions, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=HeaderBar.d.ts.map