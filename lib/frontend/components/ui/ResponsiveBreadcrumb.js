"use strict";
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
exports.ResponsiveBreadcrumb = ResponsiveBreadcrumb;
const jsx_runtime_1 = require("react/jsx-runtime");
const element_1 = require("@airdev/next/frontend/utils/element");
const React = __importStar(require("react"));
const react_1 = require("react");
const Breadcrumb_1 = require("./Breadcrumb");
const DropdownMenu_1 = require("./DropdownMenu");
// Constants
const MIN_WIDTH = 50;
const ELLIPSIS_ITEM = { label: '', href: '' };
function ResponsiveBreadcrumb({ items, className, renderItem }) {
    const containerRef = (0, react_1.useRef)(null);
    const measureRef = (0, react_1.useRef)(null);
    const [displayedItems, setDisplayedItems] = (0, react_1.useState)([]);
    const [hiddenItems, setHiddenItems] = (0, react_1.useState)([]);
    const [isInitialRender, setIsInitialRender] = (0, react_1.useState)(true);
    // 计算分隔符宽度
    const measureSeparatorWidth = (0, react_1.useCallback)(() => {
        if (!measureRef.current) {
            return 0;
        }
        return (0, element_1.measureElementWidth)(() => createSeparatorElement(), measureRef.current);
    }, []);
    // 计算省略号宽度
    const measureEllipsisWidth = (0, react_1.useCallback)(() => {
        if (!measureRef.current) {
            return 0;
        }
        return (0, element_1.measureElementWidth)(() => createEllipsisElement(), measureRef.current);
    }, []);
    // 更新显示的项目
    const updateDisplayedItems = (0, react_1.useCallback)((containerWidth) => {
        if (!containerRef.current || !measureRef.current) {
            return;
        }
        const availableWidth = Math.max(containerWidth, MIN_WIDTH);
        // 测量所有必要的宽度
        const itemWidths = items.map((item) => item === ELLIPSIS_ITEM
            ? measureEllipsisWidth()
            : (0, element_1.measureElementWidth)(() => createItemElement(item), measureRef.current));
        const separatorWidth = measureSeparatorWidth();
        const ellipsisWidth = measureEllipsisWidth();
        // 开始折叠过程
        const { visibleItems, hiddenItems } = collapseItems(items, itemWidths, separatorWidth, ellipsisWidth, availableWidth, calculateCurrentWidth);
        if (isInitialRender) {
            setIsInitialRender(false);
        }
        setDisplayedItems(visibleItems);
        setHiddenItems(hiddenItems);
    }, [items, measureSeparatorWidth, measureEllipsisWidth, isInitialRender]);
    // 设置 ResizeObserver
    (0, react_1.useEffect)(() => {
        if (!containerRef.current) {
            return;
        }
        const container = containerRef.current;
        // 创建测量容器
        if (!measureRef.current) {
            const measure = createMeasureContainer();
            document.body.appendChild(measure);
            measureRef.current = measure;
        }
        let animationFrameId;
        let observer;
        const updateCollapse = () => {
            if (!container) {
                return;
            }
            // 确保容器宽度不小于最小宽度
            const width = Math.max(container.offsetWidth, MIN_WIDTH);
            updateDisplayedItems(width);
        };
        try {
            observer = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    if (entry.target === container) {
                        cancelAnimationFrame(animationFrameId);
                        animationFrameId = requestAnimationFrame(updateCollapse);
                    }
                }
            });
            observer.observe(container);
            updateCollapse();
        }
        catch (error) {
            console.error('Error setting up ResizeObserver:', error);
        }
        return () => {
            if (observer) {
                observer.disconnect();
            }
            cancelAnimationFrame(animationFrameId);
            if (measureRef.current) {
                document.body.removeChild(measureRef.current);
                measureRef.current = null;
            }
        };
    }, [items, updateDisplayedItems]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: containerRef, className: `w-full min-w-[50px] ${className || ''}`, children: (0, jsx_runtime_1.jsx)(Breadcrumb_1.Breadcrumb, { children: (0, jsx_runtime_1.jsx)(Breadcrumb_1.BreadcrumbList, { className: "flex-nowrap", children: displayedItems.map((item, index) => {
                    const isLast = index === displayedItems.length - 1;
                    const isEllipsis = item === ELLIPSIS_ITEM;
                    return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsx)(Breadcrumb_1.BreadcrumbItem, { "data-item-index": index, className: "whitespace-nowrap", children: isEllipsis ? ((0, jsx_runtime_1.jsxs)(DropdownMenu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(DropdownMenu_1.DropdownMenuTrigger, { className: "hover:text-foreground flex cursor-pointer items-center", children: (0, jsx_runtime_1.jsx)(Breadcrumb_1.BreadcrumbEllipsis, { className: "text-muted-foreground/50" }) }), (0, jsx_runtime_1.jsx)(DropdownMenu_1.DropdownMenuContent, { align: "start", children: hiddenItems.map((hiddenItem, hiddenIndex) => ((0, jsx_runtime_1.jsx)(DropdownMenu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsx)(Breadcrumb_1.BreadcrumbLink, { href: hiddenItem.href, className: "text-muted-foreground hover:text-foreground w-full cursor-pointer truncate", children: renderItem
                                                        ? renderItem(hiddenItem)
                                                        : hiddenItem.label }) }, hiddenIndex))) })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "truncate", children: isLast ? ((0, jsx_runtime_1.jsx)(Breadcrumb_1.BreadcrumbPage, { className: "truncate", children: renderItem ? renderItem(item) : item.label })) : ((0, jsx_runtime_1.jsx)(Breadcrumb_1.BreadcrumbLink, { href: item.href, className: "text-muted-foreground hover:text-foreground truncate", children: renderItem ? renderItem(item) : item.label })) })) }), !isLast && ((0, jsx_runtime_1.jsx)(Breadcrumb_1.BreadcrumbSeparator, { "data-measure-target": "breadcrumb-separator", className: "text-muted-foreground/50 mx-0.5 [&>svg]:h-3.5 [&>svg]:w-3.5" }))] }, item.label || index));
                }) }) }) }));
}
// Utils
function calculateCurrentWidth(itemWidths, separatorWidth, ellipsisWidth, collapsedIndices) {
    let width = 0;
    let visibleCount = 0;
    let hasEllipsis = false;
    // 计算可见元素的宽度
    itemWidths.forEach((itemWidth, index) => {
        if (!collapsedIndices.has(index)) {
            width += itemWidth;
            visibleCount++;
        }
        else if (!hasEllipsis) {
            width += ellipsisWidth;
            hasEllipsis = true;
            visibleCount++;
        }
    });
    // 添加分隔符的宽度（可见元素数量减1）
    if (visibleCount > 0) {
        width += (visibleCount - 1) * separatorWidth;
    }
    return width;
}
const createMeasureContainer = () => {
    const measure = document.createElement('div');
    measure.style.position = 'absolute';
    measure.style.visibility = 'hidden';
    measure.style.top = '-9999px';
    measure.style.width = 'auto';
    measure.style.whiteSpace = 'nowrap';
    return measure;
};
const createSeparatorElement = () => {
    const separator = document.createElement('div');
    separator.className =
        'text-muted-foreground/50 mx-0.5 [&>svg]:h-3.5 [&>svg]:w-3.5, px-[10px]';
    separator.setAttribute('data-measure-target', 'breadcrumb-separator');
    // 创建 SVG 元素模拟实际的分隔符图标
    const svg = document.createElement('div');
    svg.style.width = '14px'; // 3.5 * 4px
    svg.style.height = '14px';
    separator.appendChild(svg);
    return separator;
};
const createEllipsisElement = () => {
    const container = document.createElement('div');
    container.className = 'flex items-center';
    const ellipsisSpan = document.createElement('span');
    ellipsisSpan.className =
        'flex size-9 items-center justify-center text-muted-foreground/50';
    ellipsisSpan.setAttribute('data-measure-target', 'breadcrumb-ellipsis');
    // 创建图标占位符
    const iconSpan = document.createElement('span');
    iconSpan.className = 'size-4';
    ellipsisSpan.appendChild(iconSpan);
    container.appendChild(ellipsisSpan);
    return container;
};
const createItemElement = (item) => {
    // 创建最外层的 BreadcrumbItem 容器
    const itemContainer = document.createElement('div');
    itemContainer.className = 'whitespace-nowrap inline-flex items-center';
    // 创建内容容器
    const contentContainer = document.createElement('div');
    contentContainer.className = 'truncate';
    // 创建链接元素
    const linkElement = document.createElement('a');
    linkElement.className =
        'text-muted-foreground hover:text-foreground truncate inline-flex items-center text-sm font-medium';
    linkElement.style.lineHeight = '1.25rem'; // 20px, 与实际渲染一致
    // 如果有图标，添加图标占位符
    if (item.icon) {
        const iconPlaceholder = document.createElement('span');
        iconPlaceholder.className = 'size-4';
        linkElement.appendChild(iconPlaceholder);
    }
    // 添加文本内容（不需要额外的 span 包装）
    linkElement.appendChild(document.createTextNode(item.label || ''));
    contentContainer.appendChild(linkElement);
    itemContainer.appendChild(contentContainer);
    // 强制样式计算并等待它完成
    const style = window.getComputedStyle(linkElement);
    // 访问一些关键的样式属性来确保计算完成
    void style.width;
    void style.fontSize;
    void style.lineHeight;
    void style.padding;
    void style.margin;
    return itemContainer;
};
const collapseItems = (items, itemWidths, separatorWidth, ellipsisWidth, availableWidth, calculateWidth) => {
    const hiddenItemIds = new Set();
    const hiddenItems = [];
    let totalWidth = calculateCurrentWidth(itemWidths, separatorWidth, ellipsisWidth, hiddenItemIds);
    // 如果空间足够，显示所有项目
    if (totalWidth <= availableWidth) {
        return { visibleItems: items, hiddenItems };
    }
    // 如果只有1个元素，折叠它
    if (items.length === 1) {
        hiddenItemIds.add(0);
        hiddenItems.push(items[0]);
        return { visibleItems: [ELLIPSIS_ITEM], hiddenItems };
    }
    // 如果有2个元素
    if (items.length <= 2) {
        // 尝试折叠第一个
        hiddenItemIds.add(0);
        hiddenItems.push(items[0]);
        totalWidth = calculateWidth(itemWidths, separatorWidth, ellipsisWidth, hiddenItemIds);
        // 如果只显示最后一个元素也放不下，才全部折叠
        if (totalWidth > availableWidth) {
            hiddenItemIds.add(1);
            hiddenItems.push(items[1]);
            return { visibleItems: [ELLIPSIS_ITEM], hiddenItems };
        }
        // 否则保持只折叠第一个元素的状态
        const visibleItems = [ELLIPSIS_ITEM, items[1]];
        return { visibleItems, hiddenItems };
    }
    // 如果有超过2个元素，从中间开始折叠
    hiddenItemIds.add(1);
    hiddenItems.push(items[1]);
    totalWidth = calculateWidth(itemWidths, separatorWidth, ellipsisWidth, hiddenItemIds);
    // 从中间向两边折叠
    for (let i = 2; i < items.length - 1 && totalWidth > availableWidth; i++) {
        hiddenItemIds.add(i);
        hiddenItems.push(items[i]);
        totalWidth = calculateWidth(itemWidths, separatorWidth, ellipsisWidth, hiddenItemIds);
    }
    // 如果中间元素都折叠完了还是不够，先折叠第一个元素
    if (totalWidth > availableWidth) {
        hiddenItemIds.add(0);
        hiddenItems.unshift(items[0]);
        totalWidth = calculateWidth(itemWidths, separatorWidth, ellipsisWidth, hiddenItemIds);
    }
    // 如果折叠了第一个元素还是不够，最后才考虑折叠最后一个元素
    if (totalWidth > availableWidth) {
        hiddenItemIds.add(items.length - 1);
        hiddenItems.push(items[items.length - 1]);
        return { visibleItems: [ELLIPSIS_ITEM], hiddenItems };
    }
    // 构建最终的显示列表
    const visibleItems = [];
    let hasAddedEllipsis = false;
    items.forEach((item, index) => {
        if (!hiddenItemIds.has(index)) {
            visibleItems.push(item);
        }
        else if (!hasAddedEllipsis) {
            visibleItems.push(ELLIPSIS_ITEM);
            hasAddedEllipsis = true;
        }
    });
    return { visibleItems, hiddenItems };
};
//# sourceMappingURL=ResponsiveBreadcrumb.js.map