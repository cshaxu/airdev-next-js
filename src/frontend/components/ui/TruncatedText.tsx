import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/frontend/components/ui/Tooltip';
import { useEffect, useRef, useState } from 'react';

const TruncatedText = ({ text, items }: { text: string; items: string[] }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const checkTruncation = () => {
      const element = textRef.current;
      if (element) {
        setIsTruncated(element.scrollWidth > element.clientWidth);
      }
    };

    checkTruncation();
    // 添加窗口大小变化的监听
    window.addEventListener('resize', checkTruncation);
    return () => window.removeEventListener('resize', checkTruncation);
  }, [text]);

  const content = (
    <span ref={textRef} className="block max-w-[200px] truncate text-sm">
      {text}
    </span>
  );

  if (!isTruncated) {
    return content;
  }

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="start"
          className="flex flex-col gap-1 p-2"
        >
          {items.map((item) => (
            <span key={item} className="text-sm whitespace-nowrap">
              {item}
            </span>
          ))}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export { TruncatedText };
