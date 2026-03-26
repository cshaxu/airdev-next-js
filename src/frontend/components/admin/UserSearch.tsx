'use client';

import { CurrentUser } from '@/common/types/context';
import { clientFunctionConfig } from '@/config/function/client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/frontend/components/ui/Avatar';
import { Button } from '@/frontend/components/ui/Button';
import { Input } from '@/frontend/components/ui/Input';
import {
  useBecameUser,
  useSetBecameUser,
} from '@/frontend/stores/becameUserStore';
import { Drama, Smile, User, UserKey } from 'lucide-react';
import { useState } from 'react';

export default function UserSearch() {
  const { become } = clientFunctionConfig.apiClient.auth;
  const [inputQ, setInputQ] = useState('');
  const [users, setUsers] = useState<CurrentUser[]>([]);
  const [adminTargetUserId, setAdminTargetUserId] = useState<string | null>(
    null
  );
  const became = useBecameUser();
  const setBecameUser = useSetBecameUser();
  const { mutateAsync: searchUsers, isPending: isSearching } =
    clientFunctionConfig.query.user.useMutationSearch();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    clientFunctionConfig.query.user.useUpdateOne();

  async function handleSearch() {
    const nextUsers = (await searchUsers({
      q: inputQ.trim(),
    })) as CurrentUser[];
    setUsers(nextUsers);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      void handleSearch();
    }
  }

  async function handleBecome(user: CurrentUser) {
    await become(user.id);
    setBecameUser(user);
    window.location.reload();
  }

  async function handleRevertSelf() {
    await become(null);
    setBecameUser(null);
    window.location.reload();
  }

  async function handleToggleAdmin(user: CurrentUser) {
    setAdminTargetUserId(user.id);
    try {
      await updateUser({
        params: { id: user.id },
        body: { setAdmin: !user.isAdmin },
      });
      setUsers((currentUsers) =>
        currentUsers.map((currentUser) =>
          currentUser.id === user.id
            ? { ...currentUser, isAdmin: !currentUser.isAdmin }
            : currentUser
        )
      );
    } finally {
      setAdminTargetUserId(null);
    }
  }

  return (
    <div className="space-y-6">
      {became && (
        <div className="flex items-center gap-3 rounded-lg border p-4">
          <Avatar className="size-10">
            {became.imageUrl ? (
              <AvatarImage src={became.imageUrl} alt={became.name} />
            ) : (
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
                {became.name.charAt(0)?.toUpperCase() ?? '?'}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">
              Impersonating: {became.name ?? became.id}
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={handleRevertSelf}>
            Revert Self
          </Button>
        </div>
      )}

      <div className="flex w-full gap-2">
        <Input
          placeholder="Filter by name or email..."
          value={inputQ}
          onChange={(e) => setInputQ(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button
          onClick={() => void handleSearch()}
          disabled={isSearching}
          className="min-w-20 sm:min-w-24"
        >
          Search
        </Button>
      </div>

      {users.length > 0 && (
        <div className="space-y-2">
          {users.map((user: CurrentUser) => (
            <div
              key={user.id}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              <Avatar className="size-9">
                {user.imageUrl ? (
                  <AvatarImage src={user.imageUrl} alt={user.name} />
                ) : (
                  <AvatarFallback className="text-xs font-bold">
                    {user.name.charAt(0).toUpperCase() || '?'}
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{user.name ?? '-'}</p>
                <p className="text-muted-foreground text-xs">{user.email}</p>
              </div>
              <Button
                size="sm"
                variant={became?.id === user.id ? 'default' : 'outline'}
                onClick={() => handleBecome(user)}
                disabled={became?.id === user.id}
                title={became?.id === user.id ? 'Active' : 'Become'}
              >
                {became?.id === user.id ? (
                  <Drama className="size-4" />
                ) : (
                  <Smile className="size-4" />
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => void handleToggleAdmin(user)}
                isLoading={isUpdatingUser && adminTargetUserId === user.id}
                disabled={isUpdatingUser && adminTargetUserId === user.id}
                title={user.isAdmin ? 'Remove Admin' : 'Set Admin'}
              >
                {user.isAdmin ? (
                  <UserKey className="size-4" />
                ) : (
                  <User className="size-4" />
                )}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
