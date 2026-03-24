'use client';

import { clientFunctionConfig } from '@/config/function/client';
import { Button } from '@/package/frontend/components/ui/Button';
import { Input } from '@/package/frontend/components/ui/Input';
import {
  useBecameUser,
  useSetBecameUser,
} from '@/package/frontend/stores/becameUserStore';
import { Drama, Smile, User, UserKey } from 'lucide-react';
import { useState } from 'react';

type SearchUser = {
  id: string;
  name: string;
  imageUrl: string | null;
  isAdmin: boolean;
};

export default function UserSearch() {
  const { become } = clientFunctionConfig.apiClient.auth;
  const [inputQ, setInputQ] = useState('');
  const [searchQ, setSearchQ] = useState('');
  const [adminTargetUserId, setAdminTargetUserId] = useState<string | null>(
    null
  );
  const became = useBecameUser();
  const setBecameUser = useSetBecameUser();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    clientFunctionConfig.query.user.useUpdateOne();

  const { data: users = [], isFetching } =
    clientFunctionConfig.query.user.useGetMany({ q: searchQ }) as {
      data?: SearchUser[];
      isFetching: boolean;
    };

  function handleSearch() {
    setSearchQ(inputQ.trim());
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }

  async function handleBecome(user: SearchUser) {
    await become(user.id);
    setBecameUser(user);
    window.location.reload();
  }

  async function handleRevertSelf() {
    await become(null);
    setBecameUser(null);
    window.location.reload();
  }

  async function handleToggleAdmin(user: SearchUser) {
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
                {became.name.charAt(0)?.toUpperCase() ?? '?'}
              </div>
            )}
          </div>
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
          onClick={handleSearch}
          disabled={isFetching}
          className="min-w-20 sm:min-w-24"
        >
          Search
        </Button>
      </div>

      {users.length > 0 && (
        <div className="space-y-2">
          {users.map((user: SearchUser) => (
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
                    {user.name.charAt(0).toUpperCase() || '?'}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{user.name ?? '-'}</p>
                <p className="text-muted-foreground text-xs">{user.id}</p>
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
