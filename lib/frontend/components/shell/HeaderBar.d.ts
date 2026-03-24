export type HeaderBarItem = {
    label: string;
    href?: string;
    icon?: React.ReactNode;
};
type Props = React.PropsWithChildren<{
    items?: HeaderBarItem[];
    isLoading?: boolean;
}>;
export default function HeaderBar({ children, items, isLoading, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
