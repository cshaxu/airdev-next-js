import * as React from 'react';
interface PixelResizablePanelProps {
    children: React.ReactNode;
    className?: string;
    collapsedSize: number;
    minSize: number;
    maxSize: number;
    defaultSize: number;
    isCollapsed?: boolean;
    onCollapseChange?: (isCollapsed: boolean) => void;
    onResize?: (size: number) => void;
    style?: React.CSSProperties;
}
declare const PixelResizablePanel: React.ForwardRefExoticComponent<PixelResizablePanelProps & React.RefAttributes<HTMLDivElement>>;
export { PixelResizablePanel };
//# sourceMappingURL=PixelResizable.d.ts.map