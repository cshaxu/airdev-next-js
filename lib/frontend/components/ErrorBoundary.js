'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Component } from 'react';
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return _jsx("h1", { children: "Something went wrong." });
        }
        return this.props.children;
    }
}
export default ErrorBoundary;
//# sourceMappingURL=ErrorBoundary.js.map