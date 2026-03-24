import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as React from 'react';
declare function BottomPopupSheet(props: React.ComponentProps<typeof DialogPrimitive.Root>): import("react/jsx-runtime").JSX.Element;
declare function BottomPopupSheetTrigger(props: React.ComponentProps<typeof DialogPrimitive.Trigger>): import("react/jsx-runtime").JSX.Element;
declare function BottomPopupSheetClose(props: React.ComponentProps<typeof DialogPrimitive.Close>): import("react/jsx-runtime").JSX.Element;
declare const BottomPopupSheetContent: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement> & {
    overlayClassName?: string;
    overlayStyle?: React.CSSProperties;
    onRequestClose?: () => void;
}, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare function BottomPopupSheetHeader({ className, ...props }: React.ComponentProps<'div'>): import("react/jsx-runtime").JSX.Element;
declare function BottomPopupSheetTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>): import("react/jsx-runtime").JSX.Element;
declare function BottomPopupSheetDescription({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Description>): import("react/jsx-runtime").JSX.Element;
export { BottomPopupSheet, BottomPopupSheetClose, BottomPopupSheetContent, BottomPopupSheetDescription, BottomPopupSheetHeader, BottomPopupSheetTitle, BottomPopupSheetTrigger, };
