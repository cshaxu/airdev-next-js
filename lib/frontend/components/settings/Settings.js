"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Settings;
const jsx_runtime_1 = require("react/jsx-runtime");
const HeaderBar_1 = __importDefault(require("@airdev/next/frontend/components/shell/HeaderBar"));
const Avatar_1 = require("@airdev/next/frontend/components/ui/Avatar");
const Button_1 = require("@airdev/next/frontend/components/ui/Button");
const DeleteDialog_1 = __importDefault(require("@airdev/next/frontend/components/ui/DeleteDialog"));
const Input_1 = require("@airdev/next/frontend/components/ui/Input");
const user_1 = require("@airdev/next/frontend/hooks/data/user");
const cn_1 = require("@airdev/next/frontend/lib/cn");
const react_query_1 = require("@tanstack/react-query");
const lucide_react_1 = require("lucide-react");
const react_1 = require("next-auth/react");
const react_2 = require("react");
const sonner_1 = require("sonner");
function Settings({ children, homeHref, logoutCallbackUrl, useDeleteOneUser, useUpdateOneUser, }) {
    const { data: currentUser } = (0, user_1.useRequiredCurrentUser)();
    const queryClient = (0, react_query_1.useQueryClient)();
    const [deleteOpen, setDeleteOpen] = (0, react_2.useState)(false);
    const [isEditingName, setIsEditingName] = (0, react_2.useState)(false);
    const [draftName, setDraftName] = (0, react_2.useState)(currentUser.name ?? '');
    const nameInputRef = (0, react_2.useRef)(null);
    const { mutate: deleteUser, isPending: isDeleting } = useDeleteOneUser();
    const { mutate: updateUser, isPending: isUpdatingUser } = useUpdateOneUser();
    const breadcrumbs = [
        {
            label: '',
            href: homeHref,
            icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Home, { className: "size-4" }),
        },
        { label: 'Settings' },
    ];
    (0, react_2.useEffect)(() => {
        if (!isEditingName) {
            setDraftName(currentUser.name ?? '');
        }
    }, [currentUser.name, isEditingName]);
    (0, react_2.useEffect)(() => {
        if (isEditingName) {
            nameInputRef.current?.focus();
            nameInputRef.current?.select();
        }
    }, [isEditingName]);
    const handleDeleteAccount = () => {
        deleteUser({ id: currentUser.id }, {
            onSuccess: async () => {
                queryClient.clear();
                sonner_1.toast.success('Account deleted');
                await (0, react_1.signOut)({ callbackUrl: logoutCallbackUrl });
            },
        });
    };
    const handleStartEditingName = () => {
        setDraftName(currentUser.name ?? '');
        setIsEditingName(true);
    };
    const handleCancelEditingName = () => {
        setDraftName(currentUser.name ?? '');
        setIsEditingName(false);
    };
    const handleSaveName = () => {
        const nextName = draftName.trim();
        if (nextName.length === 0) {
            sonner_1.toast.error('Name cannot be empty');
            return;
        }
        if (nextName === (currentUser.name ?? '')) {
            setIsEditingName(false);
            return;
        }
        updateUser({ params: { id: currentUser.id }, body: { name: nextName } }, {
            onSuccess: (updatedUser) => {
                queryClient.setQueryData(['currentUser'], updatedUser);
                setDraftName(updatedUser.name ?? nextName);
                setIsEditingName(false);
                sonner_1.toast.success('Name updated');
            },
        });
    };
    const handleNameKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!isUpdatingUser) {
                handleSaveName();
            }
            return;
        }
        if (event.key === 'Escape') {
            event.preventDefault();
            handleCancelEditingName();
        }
    };
    const displayName = currentUser.name.trim() || currentUser.email || 'User';
    const nameInitials = displayName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('') || 'U';
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex h-full flex-col overflow-hidden", children: [(0, jsx_runtime_1.jsx)(HeaderBar_1.default, { items: breadcrumbs }), (0, jsx_runtime_1.jsx)("div", { className: "min-h-0 flex-1 overflow-hidden", children: (0, jsx_runtime_1.jsx)("div", { className: "size-full overflow-y-auto p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsx)("section", { className: "bg-background rounded-2xl border p-5 shadow-sm", children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 items-center gap-4", children: [(0, jsx_runtime_1.jsxs)(Avatar_1.Avatar, { className: "size-16 border", children: [(0, jsx_runtime_1.jsx)(Avatar_1.AvatarImage, { src: currentUser.imageUrl ?? undefined, alt: displayName }), (0, jsx_runtime_1.jsx)(Avatar_1.AvatarFallback, { className: "text-lg font-semibold", children: nameInitials })] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [isEditingName ? ((0, jsx_runtime_1.jsx)(Input_1.Input, { ref: nameInputRef, value: draftName, onChange: (event) => setDraftName(event.target.value), onKeyDown: handleNameKeyDown, disabled: isUpdatingUser, className: "h-11 max-w-md text-base font-semibold", "aria-label": "Name" })) : ((0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-semibold", children: displayName })), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground truncate text-sm", children: currentUser.email }), isEditingName && ((0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground mt-2 text-xs", children: "Press Enter to save. Press Escape to cancel." }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(Button_1.Button, { variant: isEditingName ? 'ghost' : 'outline', onClick: isEditingName
                                                        ? handleCancelEditingName
                                                        : handleStartEditingName, disabled: isUpdatingUser, children: isEditingName ? 'Cancel' : 'Edit' }), (0, jsx_runtime_1.jsxs)(Button_1.Button, { variant: "outline", onClick: () => setDeleteOpen(true), disabled: isDeleting, className: "text-red-700", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, { className: (0, cn_1.cn)('mr-2 size-4', isDeleting && 'animate-pulse') }), "Delete"] })] })] }) }), children] }) }) }), (0, jsx_runtime_1.jsx)(DeleteDialog_1.default, { title: "Account", name: currentUser.email ?? currentUser.name ?? 'account', isOpen: deleteOpen, isLoading: isDeleting, onOpenChange: setDeleteOpen, onConfirm: handleDeleteAccount })] }));
}
//# sourceMappingURL=Settings.js.map