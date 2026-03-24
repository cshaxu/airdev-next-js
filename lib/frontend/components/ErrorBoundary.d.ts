import { Component, ReactNode } from 'react';
interface ErrorBoundaryProps {
    children: ReactNode;
}
interface ErrorBoundaryState {
    hasError: boolean;
}
declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(): ErrorBoundaryState;
    render(): string | number | bigint | boolean | Iterable<ReactNode> | Promise<string | number | bigint | boolean | import("react").ReactPortal | import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | import("react/jsx-runtime").JSX.Element | null | undefined;
}
export default ErrorBoundary;
