import { useCallback, useEffect, useRef, useState } from 'react';

export default function useDragToResize(
  initialWidth: string | number,
  side: 'left' | 'right' = 'right',
  maxWidth?: number,
  minWidth?: number,
  onStopResizing?: () => void
) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(initialWidth);

  const startResizing = () => {
    setIsResizing(true);
    document.body.style.cursor = 'col-resize';
    window.addEventListener('mouseup', stopResizing);
  };

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = 'auto';
    window.removeEventListener('mouseup', stopResizing);
    if (onStopResizing) {
      onStopResizing();
    }
  }, [onStopResizing]);

  const resizeCallback = useCallback(
    (e: MouseEvent) => {
      if (ref.current === null || !isResizing) {
        return;
      }
      e.preventDefault();

      let newWidth;

      if (side === 'right') {
        newWidth = e.clientX - ref.current.getBoundingClientRect().left;
      } else {
        newWidth = ref.current.getBoundingClientRect().right - e.clientX;
      }

      if (maxWidth && newWidth >= maxWidth) {
        setWidth(maxWidth);
      } else if (minWidth && newWidth <= minWidth) {
        setWidth(minWidth);
      } else {
        setWidth(newWidth);
      }
    },
    [isResizing, maxWidth, minWidth, side]
  );

  useEffect(() => {
    window.addEventListener('mousemove', resizeCallback);
    return () => {
      window.removeEventListener('mousemove', resizeCallback);
    };
  }, [resizeCallback, stopResizing]);

  return { ref, width, startResizing };
}
