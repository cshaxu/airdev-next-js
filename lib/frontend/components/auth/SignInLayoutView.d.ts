import { ReactNodeProps } from '@airdev/next/frontend/types/props';
type Props = ReactNodeProps & {
    appDescription: string;
    appName: string;
    heroDecorationSrc?: string;
    heroLogoSrc?: string;
};
export default function SignInLayoutView({ appDescription, appName, children, heroDecorationSrc, heroLogoSrc, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SignInLayoutView.d.ts.map