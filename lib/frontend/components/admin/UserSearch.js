'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clientFunctionConfig } from '@/config/function/client';
import { Avatar, AvatarFallback, AvatarImage, } from '../ui/Avatar.js';
import { Button } from '../ui/Button.js';
import { Input } from '../ui/Input.js';
import { useBecameUser, useSetBecameUser, } from '../../stores/becameUserStore.js';
import { Drama, Smile, User, UserKey } from 'lucide-react';
import { useState } from 'react';
export default function UserSearch() {
    const { become } = clientFunctionConfig.apiClient.auth;
    const [inputQ, setInputQ] = useState('');
    const [users, setUsers] = useState([]);
    const [adminTargetUserId, setAdminTargetUserId] = useState(null);
    const became = useBecameUser();
    const setBecameUser = useSetBecameUser();
    const { mutateAsync: searchUsers, isPending: isSearching } = clientFunctionConfig.query.user.useMutationSearch();
    const { mutateAsync: updateUser, isPending: isUpdatingUser } = clientFunctionConfig.query.user.useUpdateOne();
    async function handleSearch() {
        const nextUsers = (await searchUsers({
            q: inputQ.trim(),
        }));
        setUsers(nextUsers);
    }
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            void handleSearch();
        }
    }
    async function handleBecome(user) {
        await become(user.id);
        setBecameUser(user);
        window.location.reload();
    }
    async function handleRevertSelf() {
        await become(null);
        setBecameUser(null);
        window.location.reload();
    }
    async function handleToggleAdmin(user) {
        setAdminTargetUserId(user.id);
        try {
            await updateUser({
                params: { id: user.id },
                body: { setAdmin: !user.isAdmin },
            });
            setUsers((currentUsers) => currentUsers.map((currentUser) => currentUser.id === user.id
                ? { ...currentUser, isAdmin: !currentUser.isAdmin }
                : currentUser));
        }
        finally {
            setAdminTargetUserId(null);
        }
    }
    return (_jsxs("div", { className: "space-y-6", children: [became && (_jsxs("div", { className: "flex items-center gap-3 rounded-lg border p-4", children: [_jsx(Avatar, { className: "size-10", children: became.imageUrl ? (_jsx(AvatarImage, { src: became.imageUrl, alt: became.name })) : (_jsx(AvatarFallback, { className: "bg-primary text-primary-foreground text-sm font-bold", children: became.name.charAt(0)?.toUpperCase() ?? '?' })) }), _jsx("div", { className: "flex-1", children: _jsxs("p", { className: "text-sm font-medium", children: ["Impersonating: ", became.name ?? became.id] }) }), _jsx(Button, { size: "sm", variant: "outline", onClick: handleRevertSelf, children: "Revert Self" })] })), _jsxs("div", { className: "flex w-full gap-2", children: [_jsx(Input, { placeholder: "Filter by name or email...", value: inputQ, onChange: (e) => setInputQ(e.target.value), onKeyDown: handleKeyDown, className: "flex-1" }), _jsx(Button, { onClick: () => void handleSearch(), disabled: isSearching, className: "min-w-20 sm:min-w-24", children: "Search" })] }), users.length > 0 && (_jsx("div", { className: "space-y-2", children: users.map((user) => (_jsxs("div", { className: "flex items-center gap-3 rounded-lg border p-3", children: [_jsx(Avatar, { className: "size-9", children: user.imageUrl ? (_jsx(AvatarImage, { src: user.imageUrl, alt: user.name })) : (_jsx(AvatarFallback, { className: "text-xs font-bold", children: user.name.charAt(0).toUpperCase() || '?' })) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium", children: user.name ?? '-' }), _jsx("p", { className: "text-muted-foreground text-xs", children: user.email })] }), _jsx(Button, { size: "sm", variant: became?.id === user.id ? 'default' : 'outline', onClick: () => handleBecome(user), disabled: became?.id === user.id, title: became?.id === user.id ? 'Active' : 'Become', children: became?.id === user.id ? (_jsx(Drama, { className: "size-4" })) : (_jsx(Smile, { className: "size-4" })) }), _jsx(Button, { size: "sm", variant: "outline", onClick: () => void handleToggleAdmin(user), isLoading: isUpdatingUser && adminTargetUserId === user.id, disabled: isUpdatingUser && adminTargetUserId === user.id, title: user.isAdmin ? 'Remove Admin' : 'Set Admin', children: user.isAdmin ? (_jsx(UserKey, { className: "size-4" })) : (_jsx(User, { className: "size-4" })) })] }, user.id))) }))] }));
}
//# sourceMappingURL=UserSearch.js.map