"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DeleteDialog;
const jsx_runtime_1 = require("react/jsx-runtime");
const AlertDialog_1 = require("@airdev/next/frontend/components/ui/AlertDialog");
const Input_1 = require("@airdev/next/frontend/components/ui/Input");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
function DeleteDialog({ title, name, isOpen, isLoading = false, isDangerous = true, onOpenChange, onConfirm, }) {
    // states
    const [confirmName, setConfirmName] = (0, react_1.useState)('');
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
    return ((0, jsx_runtime_1.jsx)(AlertDialog_1.AlertDialog, { open: isOpen, onOpenChange: (open) => {
            onOpenChange(open);
            if (!open) {
                setConfirmName('');
            }
        }, children: (0, jsx_runtime_1.jsxs)(AlertDialog_1.AlertDialogContent, { children: [(0, jsx_runtime_1.jsxs)(AlertDialog_1.AlertDialogHeader, { children: [(0, jsx_runtime_1.jsxs)(AlertDialog_1.AlertDialogTitle, { className: "text-foreground", children: ["Delete ", title] }), (0, jsx_runtime_1.jsxs)(AlertDialog_1.AlertDialogDescription, { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("p", { children: ["This action cannot be undone. This will permanently delete", ' ', (0, jsx_runtime_1.jsx)("strong", { className: "text-foreground font-medium", children: name }), "."] }), isDangerous && ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("p", { children: ["Please type", ' ', (0, jsx_runtime_1.jsx)("strong", { className: "text-foreground font-medium", children: name }), ' ', "to confirm."] }), (0, jsx_runtime_1.jsx)(Input_1.Input, { value: confirmName, onChange: (e) => setConfirmName(e.target.value), placeholder: "Type to confirm", className: "bg-background text-foreground placeholder:text-muted-foreground max-w-[400px]", onKeyDown: (e) => {
                                                if (e.key === 'Enter' && isConfirmValid && !isLoading) {
                                                    handleConfirm(e);
                                                }
                                            } })] }))] })] }), (0, jsx_runtime_1.jsxs)(AlertDialog_1.AlertDialogFooter, { children: [(0, jsx_runtime_1.jsx)(AlertDialog_1.AlertDialogCancel, { disabled: isLoading, children: "Cancel" }), (0, jsx_runtime_1.jsx)(AlertDialog_1.AlertDialogAction, { disabled: !isConfirmValid || isLoading, className: "min-w-19", onClick: (e) => {
                                e.preventDefault();
                                onConfirm();
                            }, children: isLoading ? (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, { className: "animate-spin" }) : 'Delete' })] })] }) }));
}
//# sourceMappingURL=DeleteDialog.js.map