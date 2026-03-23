"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserSearch;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("@airdev/next/frontend/components/ui/Button");
const Input_1 = require("@airdev/next/frontend/components/ui/Input");
const becameUserStore_1 = require("@airdev/next/frontend/stores/becameUserStore");
const react_query_1 = require("@tanstack/react-query");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
function UserSearch({ becomeUser, getManyUsersQueryOptions, useUpdateOneUser, }) {
    const [inputQ, setInputQ] = (0, react_1.useState)('');
    const [searchQ, setSearchQ] = (0, react_1.useState)('');
    const [adminTargetUserId, setAdminTargetUserId] = (0, react_1.useState)(null);
    const became = (0, becameUserStore_1.useBecameUser)();
    const setBecameUser = (0, becameUserStore_1.useSetBecameUser)();
    const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateOneUser();
    const { data: users = [], isFetching } = (0, react_query_1.useQuery)(getManyUsersQueryOptions({ q: searchQ }));
    function handleSearch() {
        setSearchQ(inputQ.trim());
    }
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }
    async function handleBecome(user) {
        await becomeUser(user.id);
        setBecameUser(user);
        window.location.reload();
    }
    async function handleRevertSelf() {
        await becomeUser(null);
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
        }
        finally {
            setAdminTargetUserId(null);
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [became && ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 rounded-lg border p-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "size-10 overflow-hidden rounded-full", children: became.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: became.imageUrl, alt: became.name, className: "size-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "bg-primary text-primary-foreground flex size-full items-center justify-center text-sm font-bold", children: (became.name || '?').charAt(0).toUpperCase() })) }), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsxs)("p", { className: "text-sm font-medium", children: ["Impersonating: ", became.name] }) }), (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "outline", onClick: () => void handleRevertSelf(), children: "Revert Self" })] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex w-full gap-2", children: [(0, jsx_runtime_1.jsx)(Input_1.Input, { placeholder: "Filter by name or email...", value: inputQ, onChange: (e) => setInputQ(e.target.value), onKeyDown: handleKeyDown, className: "flex-1" }), (0, jsx_runtime_1.jsx)(Button_1.Button, { onClick: handleSearch, disabled: isFetching, className: "min-w-20 sm:min-w-24", children: "Search" })] }), users.length > 0 && ((0, jsx_runtime_1.jsx)("div", { className: "space-y-2", children: users.map((user) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3 rounded-lg border p-3", children: [(0, jsx_runtime_1.jsx)("div", { className: "size-9 overflow-hidden rounded-full", children: user.imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: user.imageUrl, alt: user.name, className: "size-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "bg-muted flex size-full items-center justify-center text-xs font-bold", children: (user.name || '?').charAt(0).toUpperCase() })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium", children: user.name || '?' }), (0, jsx_runtime_1.jsx)("p", { className: "text-muted-foreground text-xs", children: user.id })] }), (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: became?.id === user.id ? 'default' : 'outline', onClick: () => void handleBecome(user), disabled: became?.id === user.id, title: became?.id === user.id ? 'Active' : 'Become', children: became?.id === user.id ? ((0, jsx_runtime_1.jsx)(lucide_react_1.Drama, { className: "size-4" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.Smile, { className: "size-4" })) }), (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "outline", onClick: () => void handleToggleAdmin(user), isLoading: isUpdatingUser && adminTargetUserId === user.id, disabled: isUpdatingUser && adminTargetUserId === user.id, title: user.isAdmin ? 'Remove Admin' : 'Set Admin', children: user.isAdmin ? ((0, jsx_runtime_1.jsx)(lucide_react_1.UserKey, { className: "size-4" })) : ((0, jsx_runtime_1.jsx)(lucide_react_1.User, { className: "size-4" })) })] }, user.id))) }))] }));
}
//# sourceMappingURL=UserSearch.js.map