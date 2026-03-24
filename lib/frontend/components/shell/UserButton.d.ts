type SidebarProps = {
    mode: 'sidebar';
    isFull: boolean;
};
type BottomNavProps = {
    mode: 'bottom-nav';
    showLabel: boolean;
};
type Props = SidebarProps | BottomNavProps;
export default function UserButton(props: Props): import("react/jsx-runtime").JSX.Element;
export {};
