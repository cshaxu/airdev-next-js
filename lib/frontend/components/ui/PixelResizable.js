"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixelResizablePanel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("@airdev/next/frontend/lib/cn");
const React = __importStar(require("react"));
const PixelResizablePanel = React.forwardRef(({ children, className, collapsedSize, minSize, maxSize, defaultSize, isCollapsed = false, onCollapseChange, onResize, style, ...props }, ref) => {
    const [width, setWidth] = React.useState(defaultSize);
    const isDragging = React.useRef(false);
    const startX = React.useRef(0);
    const startWidth = React.useRef(0);
    // 处理鼠标移动事件
    const handleMouseMove = React.useCallback((e) => {
        if (!isDragging.current) {
            return;
        }
        const delta = e.clientX - startX.current;
        let newWidth = startWidth.current + delta;
        // 如果当前是折叠状态，且拖动距离超过阈值，则展开
        if (isCollapsed && newWidth > collapsedSize * 2) {
            newWidth = Math.max(minSize, newWidth);
            setWidth(newWidth);
            onCollapseChange?.(false);
            onResize?.(newWidth);
            // 更新起始位置，以便继续拖动
            startX.current = e.clientX;
            startWidth.current = newWidth;
            return;
        }
        // 如果当前是展开状态
        if (!isCollapsed) {
            // 如果拖动到小于折叠宽度，则折叠
            if (newWidth < collapsedSize) {
                setWidth(collapsedSize);
                onCollapseChange?.(true);
                onResize?.(collapsedSize);
                // 更新起始位置，以便继续拖动
                startX.current = e.clientX;
                startWidth.current = collapsedSize;
                return;
            }
            // 限制在最小和最大宽度之间
            newWidth = Math.max(minSize, Math.min(maxSize, newWidth));
            setWidth(newWidth);
            onResize?.(newWidth);
        }
    }, [isCollapsed, collapsedSize, minSize, maxSize, onCollapseChange, onResize]);
    // 处理鼠标松开事件
    const handleMouseUp = React.useCallback(() => {
        isDragging.current = false;
        document.body.style.cursor = '';
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }, [handleMouseMove]);
    // 处理鼠标按下事件
    const handleMouseDown = React.useCallback((e) => {
        if (e.button !== 0) {
            return;
        }
        e.preventDefault();
        isDragging.current = true;
        startX.current = e.clientX;
        startWidth.current = isCollapsed ? collapsedSize : width;
        document.body.style.cursor = 'ew-resize';
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [width, isCollapsed, collapsedSize, handleMouseMove, handleMouseUp]);
    // 监听鼠标状态
    React.useEffect(() => {
        const handleGlobalMouseUp = (e) => {
            if (e.button === 0) {
                // 只处理左键
                isDragging.current = false;
                document.body.style.cursor = '';
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
            }
        };
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [handleMouseMove, handleMouseUp]);
    // 清理事件监听器
    React.useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = ''; // 确保组件卸载时也恢复鼠标样式
        };
    }, [handleMouseMove, handleMouseUp]);
    // 监听状态变化，保持拖拽状态
    React.useEffect(() => {
        if (isDragging.current) {
            document.body.style.cursor = 'ew-resize';
        }
    }, [isCollapsed]);
    React.useEffect(() => {
        if (!isCollapsed && width < minSize) {
            setWidth(minSize);
            onResize?.(minSize);
        }
    }, [isCollapsed, width, minSize, onResize]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('relative flex h-full flex-col overflow-hidden', className), style: { ...style, width: isCollapsed ? collapsedSize : width }, ...props, children: [children, (0, jsx_runtime_1.jsx)("div", { className: "bg-border hover:bg-primary focus-visible:ring-ring absolute top-0 right-0 h-full w-px cursor-ew-resize select-none after:absolute after:inset-y-0 after:left-1/2 after:w-4 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none", onMouseDown: handleMouseDown })] }));
});
exports.PixelResizablePanel = PixelResizablePanel;
PixelResizablePanel.displayName = 'PixelResizablePanel';
//# sourceMappingURL=PixelResizable.js.map