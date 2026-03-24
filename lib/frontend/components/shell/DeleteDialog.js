'use client';
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, } from '../ui/AlertDialog';
import { Input } from '../ui/Input';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
export default function DeleteDialog({ title, name, isOpen, isLoading = false, isDangerous = true, onOpenChange, onConfirm, }) {
    // states
    const [confirmName, setConfirmName] = useState('');
    const isConfirmValid = isDangerous ? confirmName === name : true;
    // handlers
    const handleConfirm = async (e) => {
        e.preventDefault();
        if (!isConfirmValid) {
            return;
        }
        onConfirm();
        setConfirmName('');
        onOpenChange(false);
    };
    return (_jsx(AlertDialog, { open: isOpen, onOpenChange: (open) => {
            onOpenChange(open);
            if (!open) {
                setConfirmName('');
            }
        }, children: _jsxs(AlertDialogContent, { children: [_jsxs(AlertDialogHeader, { children: [_jsxs(AlertDialogTitle, { className: "text-foreground", children: ["Delete ", title] }), _jsx(AlertDialogDescription, { asChild: true, children: _jsxs("div", { className: "text-muted-foreground space-y-4 text-left", children: [_jsxs("p", { children: ["This action cannot be undone. This will permanently delete", ' ', _jsx("strong", { className: "text-foreground font-medium", children: name }), "."] }), isDangerous && (_jsxs("div", { className: "space-y-2", children: [_jsxs("p", { children: ["Please type", ' ', _jsx("strong", { className: "text-foreground font-medium", children: name }), ' ', "to confirm."] }), _jsx(Input, { value: confirmName, onChange: (e) => setConfirmName(e.target.value), placeholder: "Type to confirm", className: "bg-background text-foreground placeholder:text-muted-foreground max-w-[400px]", onKeyDown: (e) => {
                                                    if (e.key === 'Enter' && isConfirmValid && !isLoading) {
                                                        handleConfirm(e);
                                                    }
                                                } })] }))] }) })] }), _jsxs(AlertDialogFooter, { children: [_jsx(AlertDialogCancel, { disabled: isLoading, children: "Cancel" }), _jsx(AlertDialogAction, { disabled: !isConfirmValid || isLoading, className: "min-w-19", onClick: (e) => {
                                e.preventDefault();
                                onConfirm();
                            }, children: isLoading ? _jsx(Loader2, { className: "animate-spin" }) : 'Delete' })] })] }) }));
}
//# sourceMappingURL=DeleteDialog.js.map