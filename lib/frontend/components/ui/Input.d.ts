import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
export declare const inputVariants: (props?: ({
    scale?: "default" | "sm" | "lg" | "compact" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
}
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input };
