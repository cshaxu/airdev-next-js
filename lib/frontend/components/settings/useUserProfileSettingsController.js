'use client';
import { ROOT_HREF } from '../../../common/constant.js';
import { clientFunctionConfig } from '@/config/function/client';
import { publicConfig } from '@/config/json/public';
import { useRequiredCurrentUser, useUpdateCurrentUser, } from '../../hooks/data/user.js';
import { useQueryClient } from '@tanstack/react-query';
import { Home } from 'lucide-react';
import { createElement, useEffect, useRef, useState, } from 'react';
import { toast } from 'sonner';
export function useUserProfileSettingsController() {
    const { data: currentUser } = useRequiredCurrentUser();
    const queryClient = useQueryClient();
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [draftName, setDraftName] = useState(currentUser.name ?? '');
    const nameInputRef = useRef(null);
    const { mutate: deleteUser, isPending: isDeleting } = clientFunctionConfig.query.user.useDeleteOne();
    const { mutate: updateCurrentUser, isPending: isUpdatingUser } = useUpdateCurrentUser();
    const breadcrumbs = [
        {
            label: '',
            href: publicConfig.shell.routes.homeHref,
            icon: createElement(Home, { className: 'size-4' }),
        },
        { label: 'Settings' },
    ];
    useEffect(() => {
        if (!isEditingName) {
            setDraftName(currentUser.name ?? '');
        }
    }, [currentUser.name, isEditingName]);
    useEffect(() => {
        if (isEditingName) {
            nameInputRef.current?.focus();
            nameInputRef.current?.select();
        }
    }, [isEditingName]);
    function handleDeleteAccount() {
        deleteUser({ id: currentUser.id }, {
            onSuccess: async () => {
                toast.success('Account deleted');
                await clientFunctionConfig.apiClient.auth.signOut({
                    callbackUrl: ROOT_HREF,
                });
            },
        });
    }
    function handleStartEditingName() {
        setDraftName(currentUser.name ?? '');
        setIsEditingName(true);
    }
    function handleCancelEditingName() {
        setDraftName(currentUser.name ?? '');
        setIsEditingName(false);
    }
    function handleSaveName() {
        const nextName = draftName.trim();
        if (nextName.length === 0) {
            toast.error('Name cannot be empty');
            return;
        }
        if (nextName === (currentUser.name ?? '')) {
            setIsEditingName(false);
            return;
        }
        updateCurrentUser({
            params: { id: currentUser.id },
            body: { name: nextName },
        }, {
            onSuccess: (updatedUser) => {
                queryClient.setQueryData(['currentUser'], updatedUser);
                setDraftName(updatedUser.name ?? nextName);
                setIsEditingName(false);
                toast.success('Name updated');
            },
        });
    }
    function handleNameKeyDown(event) {
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
    }
    const displayName = currentUser.name.trim() || currentUser.email || 'User';
    const nameInitials = displayName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('') || 'U';
    return {
        currentUser,
        breadcrumbs,
        deleteOpen,
        isEditingName,
        draftName,
        nameInputRef,
        isDeleting,
        isUpdatingUser,
        displayName,
        nameInitials,
        setDeleteOpen,
        setDraftName,
        handleDeleteAccount,
        handleStartEditingName,
        handleCancelEditingName,
        handleNameKeyDown,
    };
}
//# sourceMappingURL=useUserProfileSettingsController.js.map