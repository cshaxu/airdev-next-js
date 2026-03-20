import { Button } from '@/frontend/components/ui/Button';
import { cn } from '@/frontend/lib/cn';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

type Props = { title: string; children: React.ReactNode };

export default function FoldableSection({ title, children }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border-border bg-card text-card-foreground rounded-lg border">
      <h2 className="text-blue-dark-75 flex items-center justify-between bg-gray-100 px-4 pt-1.5 text-lg font-semibold">
        <span className="text-sm font-semibold">{title}</span>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <ChevronDown
            className={cn(
              'size-4 transition-transform duration-200',
              isExpanded ? 'rotate-180' : ''
            )}
          />
        </Button>
      </h2>
      {isExpanded && <div className="p-4">{children}</div>}
    </div>
  );
}
