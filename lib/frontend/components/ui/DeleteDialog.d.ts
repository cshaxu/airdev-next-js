type Props = {
    title: string;
    name: string;
    isOpen: boolean;
    isLoading?: boolean;
    isDangerous?: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
};
export default function DeleteDialog({ title, name, isOpen, isLoading, isDangerous, onOpenChange, onConfirm, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DeleteDialog.d.ts.map