import { ReactNodeProps } from '../../types/props.js';
export declare function generateProtectedLayoutMetadata(): {
    robots: {
        index: boolean;
        follow: boolean;
        nocache: boolean;
    };
};
export default function ProtectedLayout({ children }: ReactNodeProps): import("react/jsx-runtime").JSX.Element;
