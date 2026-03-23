import { AdminTabItem } from '@airdev/next/adapter/frontend/shell/types';
import { ReactNodeProps } from '@airdev/next/frontend/types/props';
type Props = ReactNodeProps & {
    tabs: AdminTabItem[];
};
export default function AdminLayoutView({ children, tabs }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AdminLayoutView.d.ts.map