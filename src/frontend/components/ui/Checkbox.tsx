'use client';

import { cn } from '@/frontend/lib/cn';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import * as React from 'react';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    dot?: boolean;
    indicatorClassName?: string;
    label?: React.ReactNode;
    position?: 'left' | 'right';
    variant?: 'default' | 'compact';
  }
>(
  (
    {
      className,
      dot = false,
      indicatorClassName,
      label,
      position = 'left',
      variant = 'default',
      ...props
    },
    ref
  ) => (
    <div className="flex items-center">
      <div className={cn(position === 'right' ? 'order-1 ml-2' : 'mr-2')}>
        <CheckboxPrimitive.Root
          ref={ref}
          className={cn(
            'peer border-input size-4 shrink-0 cursor-pointer rounded border',
            'focus-visible:ring-1 focus-visible:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-50',
            {
              'data-[state=checked]:bg-foreground data-[state=checked]:text-background':
                !dot,
            },
            variant === 'compact' &&
              'data-[state=checked]:text-background size-4.5 rounded-sm border-gray-400 data-[state=checked]:bg-gray-600',
            className
          )}
          {...props}
        >
          <CheckboxPrimitive.Indicator
            className={cn('flex items-center justify-center text-current')}
          >
            {dot ? (
              <span
                className={cn(
                  'bg-foreground size-2 rounded',
                  indicatorClassName
                )}
              />
            ) : (
              <Check className={cn('size-3 stroke-3', indicatorClassName)} />
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
      </div>
      {label && (
        <label
          htmlFor={props.id}
          className={cn(
            'text-body select-none',
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            position === 'right' && 'order-0'
          )}
        >
          {label}
        </label>
      )}
    </div>
  )
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
