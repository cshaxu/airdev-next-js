'use client';

import { becomeUser } from '@/frontend/sdks/auth-client';
import {
  useBecameUser,
  useSetBecameUser,
} from '@/frontend/stores/becameUserStore';

export default function BecameUser() {
  const became = useBecameUser();
  const setBecameUser = useSetBecameUser();

  if (!became) {
    return null;
  }

  async function handleRevertSelf() {
    await becomeUser(null);
    setBecameUser(null);
    window.location.reload();
  }

  return (
    <button
      onClick={handleRevertSelf}
      title={`Impersonating ${became.name ?? became.id} — click to revert`}
      className="fixed top-3 right-3 z-[9999] size-10 cursor-pointer overflow-hidden rounded-full opacity-50 shadow-xl blur-[1px] transition-opacity hover:opacity-80 hover:blur-none"
    >
      {became.imageUrl ? (
        <img
          src={became.imageUrl}
          alt={became.name ?? ''}
          className="size-full object-cover"
        />
      ) : (
        <div className="bg-primary text-primary-foreground flex size-full items-center justify-center text-sm font-bold">
          {became.name?.charAt(0)?.toUpperCase() ?? '?'}
        </div>
      )}
    </button>
  );
}
