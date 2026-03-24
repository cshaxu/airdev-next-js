'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarFallback, AvatarImage, } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Pencil, Trash2 } from 'lucide-react';
export default function EditUserProfileTile({ vm, }) {
    function handleNameChange(event) {
        vm.setDraftName(event.target.value);
    }
    return (_jsx("section", { className: "bg-background min-w-[220px] rounded-2xl border p-5 shadow-sm", children: _jsxs("div", { className: "flex flex-row items-center justify-between gap-4", children: [_jsxs("div", { className: "flex min-w-0 items-center gap-4", children: [_jsxs(Avatar, { className: "size-16 border", children: [_jsx(AvatarImage, { src: vm.currentUser.imageUrl ?? undefined, alt: vm.displayName }), _jsx(AvatarFallback, { className: "text-lg font-semibold", children: vm.nameInitials })] }), _jsxs("div", { className: "min-w-0 flex-1", children: [vm.isEditingName ? (_jsx(Input, { ref: vm.nameInputRef, value: vm.draftName, onChange: handleNameChange, onKeyDown: vm.handleNameKeyDown, disabled: vm.isUpdatingUser, className: "h-11 max-w-md text-base font-semibold", "aria-label": "Name" })) : (_jsx("p", { className: "truncate text-lg font-semibold", children: vm.displayName })), _jsx("p", { className: "text-muted-foreground truncate text-sm", children: vm.currentUser.email }), vm.isEditingName && (_jsx("p", { className: "text-muted-foreground mt-2 text-xs", children: "Press Enter to save. Press Escape to cancel." }))] })] }), _jsxs("div", { className: "flex shrink-0 items-center gap-2", children: [_jsxs(Button, { "aria-label": vm.isEditingName ? 'Cancel editing' : 'Edit profile', variant: vm.isEditingName ? 'ghost' : 'outline', className: "size-9 min-w-9 gap-0 px-0 min-[500px]:h-9 min-[500px]:w-auto min-[500px]:min-w-[96px] min-[500px]:gap-2 min-[500px]:px-4", onClick: vm.isEditingName
                                ? vm.handleCancelEditingName
                                : vm.handleStartEditingName, disabled: vm.isUpdatingUser, children: [_jsx(Pencil, { className: "size-4" }), _jsx("span", { className: "hidden min-[500px]:inline", children: vm.isEditingName ? 'Cancel' : 'Edit' })] }), _jsxs(Button, { "aria-label": "Delete account", variant: "outline", className: "size-9 min-w-9 gap-0 border-red-200 px-0 text-red-600 hover:bg-red-50 hover:text-red-700 min-[500px]:h-9 min-[500px]:w-auto min-[500px]:min-w-[96px] min-[500px]:gap-2 min-[500px]:px-4", onClick: () => vm.setDeleteOpen(true), disabled: vm.isDeleting || vm.isEditingName, children: [_jsx(Trash2, { className: "size-4" }), _jsx("span", { className: "hidden min-[500px]:inline", children: "Delete" })] })] })] }) }));
}
//# sourceMappingURL=EditUserProfileTile.js.map