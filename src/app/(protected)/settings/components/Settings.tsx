'use client';

import { clientQueryAdapter } from '@airdev/next/adapter';
import { shellAdapter } from '@airdev/next/adapter/frontend/shell';
import DeleteDialog from '@airdev/next/frontend/components/DeleteDialog';
import HeaderBar, {
  HeaderBarItem,
} from '@airdev/next/frontend/components/HeaderBar';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@airdev/next/frontend/components/ui/Avatar';
import { Button } from '@airdev/next/frontend/components/ui/Button';
import { Input } from '@airdev/next/frontend/components/ui/Input';
import { useRequiredCurrentUser } from '@airdev/next/frontend/hooks/data/user';
import { cn } from '@airdev/next/frontend/lib/cn';
import { useQueryClient } from '@tanstack/react-query';
import { Home, Trash2 } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { KeyboardEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export default function Settings({ children }: { children?: ReactNode }) {
  const { data: currentUser } = useRequiredCurrentUser();
  const queryClient = useQueryClient();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [draftName, setDraftName] = useState(currentUser.name ?? '');
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate: deleteUser, isPending: isDeleting } =
    clientQueryAdapter.useDeleteOneUser();
  const { mutate: updateUser, isPending: isUpdatingUser } =
    clientQueryAdapter.useUpdateOneUser();

  const breadcrumbs: HeaderBarItem[] = [
    {
      label: '',
      href: shellAdapter.navigation.homeHref,
      icon: <Home className="size-4" />,
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

  const handleDeleteAccount = () => {
    deleteUser(
      { id: currentUser.id },
      {
        onSuccess: async () => {
          queryClient.clear();
          toast.success('Account deleted');
          await signOut({
            callbackUrl: shellAdapter.navigation.logoutCallbackUrl,
          });
        },
      }
    );
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
      toast.error('Name cannot be empty');
      return;
    }

    if (nextName === (currentUser.name ?? '')) {
      setIsEditingName(false);
      return;
    }

    updateUser(
      { params: { id: currentUser.id }, body: { name: nextName } },
      {
        onSuccess: (updatedUser) => {
          queryClient.setQueryData(['currentUser'], updatedUser);
          setDraftName(updatedUser.name ?? nextName);
          setIsEditingName(false);
          toast.success('Name updated');
        },
      }
    );
  };

  const handleNameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
  const nameInitials =
    displayName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? '')
      .join('') || 'U';

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <HeaderBar items={breadcrumbs} />
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="size-full overflow-y-auto p-6">
          <div className="space-y-6">
            <section className="bg-background rounded-2xl border p-5 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <Avatar className="size-16 border">
                    <AvatarImage
                      src={currentUser.imageUrl ?? undefined}
                      alt={displayName}
                    />
                    <AvatarFallback className="text-lg font-semibold">
                      {nameInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    {isEditingName ? (
                      <Input
                        ref={nameInputRef}
                        value={draftName}
                        onChange={(event) => setDraftName(event.target.value)}
                        onKeyDown={handleNameKeyDown}
                        disabled={isUpdatingUser}
                        className="h-11 max-w-md text-base font-semibold"
                        aria-label="Name"
                      />
                    ) : (
                      <p className="truncate text-lg font-semibold">
                        {displayName}
                      </p>
                    )}
                    <p className="text-muted-foreground truncate text-sm">
                      {currentUser.email}
                    </p>
                    {isEditingName && (
                      <p className="text-muted-foreground mt-2 text-xs">
                        Press Enter to save. Press Escape to cancel.
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={isEditingName ? 'ghost' : 'outline'}
                    onClick={
                      isEditingName
                        ? handleCancelEditingName
                        : handleStartEditingName
                    }
                    disabled={isUpdatingUser}
                  >
                    {isEditingName ? 'Cancel' : 'Edit'}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setDeleteOpen(true)}
                    disabled={isDeleting}
                    className="text-red-700"
                  >
                    <Trash2
                      className={cn(
                        'mr-2 size-4',
                        isDeleting && 'animate-pulse'
                      )}
                    />
                    Delete
                  </Button>
                </div>
              </div>
            </section>

            {children}
          </div>
        </div>
      </div>

      <DeleteDialog
        title="Account"
        name={currentUser.email ?? currentUser.name ?? 'account'}
        isOpen={deleteOpen}
        isLoading={isDeleting}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
}
