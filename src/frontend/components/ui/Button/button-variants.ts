import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-primary-hover disabled:bg-blue-300 disabled:text-white/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 disabled:bg-destructive/50 disabled:text-destructive-foreground/50',
        outline:
          'border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground disabled:text-accent-foreground/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:bg-secondary/50 disabled:text-secondary-foreground/50',
        ghost:
          'text-foreground hover:bg-accent hover:text-accent-foreground disabled:text-accent-foreground/50',
        link: 'text-primary underline-offset-4 hover:underline disabled:text-primary/50',
      },
      size: {
        default: 'h-9 px-4 py-2 text-sm font-medium',
        xs: 'h-7 px-2 text-xs font-medium',
        sm: 'h-8 px-3 text-xs font-medium',
        lg: 'h-10 px-8 text-base font-medium',
        xl: 'h-12 px-10 text-base font-bold',
        icon: 'size-9',
        iconSm: 'size-7',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
