'use client';

import { apiClientAdapter } from '@airdev/next/adapter/frontend/api-client';
import { clientQueryAdapter } from '@airdev/next/adapter/frontend/query';
import { CurrentUser } from '@airdev/next/common/types/context';
import { Button } from '@airdev/next/frontend/components/ui/Button';
import { Input } from '@airdev/next/frontend/components/ui/Input';
import {
  useBecameUser,
  useSetBecameUser,
} from '@airdev/next/frontend/stores/becameUserStore';
import { useQuery } from '@tanstack/react-query';
import { Drama, Smile, User, UserKey } from 'lucide-react';
import { useState } from 'react';

export default function UserSearch() {
  const [inputQ, setInputQ] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [adminTargetUserId, setAdminTargetUserId] = useState<string | null>(
    null
  );
  const became = useBecameUser();
  const setBecameUser = useSetBecameUser();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    clientQueryAdapter.useUpdateOneUser();

  const { data: users = [], isFetching } = useQuery(
    clientQueryAdapter.getManyUsersQueryOptions({ q: searchQ })
  );

  function handleSearch() {
    setSearchQ(inputQ.trim());
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  async function handleBecome(user: CurrentUser) {
    await apiClientAdapter.becomeUser(user.id);
    setBecameUser(user);
    window.location.reload();
  }

  async function handleRevertSelf() {
    await apiClientAdapter.becomeUser(null);
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
    } finally {
      setAdminTargetUserId(null);
    }
  }

  return (
    <div className="space-y-6">
      {became && (
        <div className="flex items-center gap-3 rounded-lg border p-4">
          <div className="size-10 overflow-hidden rounded-full">
            {became.imageUrl ? (
              <img
                src={became.imageUrl}
                alt={became.name}
                className="size-full object-cover"
              />
            ) : (
              <div className="bg-primary text-primary-foreground flex size-full items-center justify-center text-sm font-bold">
                {(became.name || '?').charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Impersonating: {became.name}</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => void handleRevertSelf()}
          >
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
          onClick={handleSearch}
          disabled={isFetching}
          className="min-w-20 sm:min-w-24"
        >
          Search
        </Button>
      </div>

      {users.length > 0 && (
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              <div className="size-9 overflow-hidden rounded-full">
                {user.imageUrl ? (
                  <img
                    src={user.imageUrl}
                    alt={user.name}
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="bg-muted flex size-full items-center justify-center text-xs font-bold">
                    {(user.name || '?').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{user.name || '?'}</p>
                <p className="text-muted-foreground text-xs">{user.id}</p>
              </div>
              <Button
                size="sm"
                variant={became?.id === user.id ? 'default' : 'outline'}
                onClick={() => void handleBecome(user)}
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
