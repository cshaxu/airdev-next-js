import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { buttonVariants } from './button-variants';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
    asChild?: boolean;
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
export { Button };
//# sourceMappingURL=Button.d.ts.map