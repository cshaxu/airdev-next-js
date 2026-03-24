'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { clientComponentConfig } from '@/config/component/client';
import DeleteDialog from '../shell/DeleteDialog';
import HeaderBar from '../shell/HeaderBar';
import EditUserProfileTile from './EditUserProfileTile';
import { useUserProfileSettingsController } from './useUserProfileSettingsController';
export default function SettingsView() {
    const vm = useUserProfileSettingsController();
    const { SettingsContent } = clientComponentConfig;
    return (_jsxs("div", { className: "flex h-full flex-col overflow-hidden", children: [_jsx(HeaderBar, { items: vm.breadcrumbs }), _jsx("div", { className: "min-h-0 flex-1 overflow-hidden", children: _jsx("div", { className: "size-full overflow-y-auto p-6", children: _jsxs("div", { className: "space-y-6", children: [_jsx(EditUserProfileTile, { vm: vm }), _jsx(SettingsContent, { userId: vm.currentUser.id })] }) }) }), _jsx(DeleteDialog, { title: "Account", name: vm.currentUser.email ?? vm.currentUser.name ?? 'account', isOpen: vm.deleteOpen, isLoading: vm.isDeleting, onOpenChange: vm.setDeleteOpen, onConfirm: vm.handleDeleteAccount })] }));
}
//# sourceMappingURL=Settings.js.map