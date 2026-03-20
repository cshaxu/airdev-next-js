import { RefObject, useEffect, useState } from 'react';

type Options = {
  /**
   * 是否在依赖项变化时重新计算，如数据加载后
   */
  dependencyValue?: any;
  /**
   * 延迟计算时间点，默认为[0, 300]ms
   */
  delayTimepoints?: number[];
};

/**
 * 计算内容宽度的Hook，考虑滚动条宽度
 * @param contentRef 内容区域的引用
 * @param scrollContainerRef 滚动容器的引用
 * @param options 配置选项
 * @returns 计算得到的内容宽度
 */
export function useContentWidth(
  contentRef: RefObject<HTMLDivElement | null>,
  scrollContainerRef: RefObject<HTMLDivElement | null>,
  options: Options = {}
): number {
  const [contentWidth, setContentWidth] = useState<number>(0);
  const { dependencyValue, delayTimepoints = [0, 300] } = options;

  useEffect(() => {
    const calculateWidth = () => {
      if (contentRef.current && scrollContainerRef.current) {
        // 计算内容区域宽度和滚动条是否可见
        const containerClientWidth = scrollContainerRef.current.clientWidth;

        // 获取内容区域宽度
        const contentWidth = contentRef.current.offsetWidth;

        // 设置的宽度 = 如果存在滚动条使用clientWidth，否则使用contentWidth
        const hasScrollbar =
          scrollContainerRef.current.scrollHeight >
          scrollContainerRef.current.clientHeight;

        const width = hasScrollbar ? containerClientWidth : contentWidth;

        setContentWidth(width);
      }
    };

    // 页面加载完成后延迟计算宽度
    const timers = delayTimepoints.map((delay) =>
      setTimeout(calculateWidth, delay)
    );

    // 监听窗口大小变化
    window.addEventListener('resize', calculateWidth);

    // 使用ResizeObserver监听内容区域和滚动容器的变化
    const observer = new ResizeObserver(calculateWidth);

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }

    // 当依赖项存在时，执行一次计算
    if (dependencyValue) {
      calculateWidth();
    }

    // 清理函数
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('resize', calculateWidth);
      observer.disconnect();
    };
  }, [contentRef, scrollContainerRef, dependencyValue, delayTimepoints]);

  return contentWidth;
}
