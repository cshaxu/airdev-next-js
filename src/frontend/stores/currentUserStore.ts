import type { CurrentUser } from '@airdev/next/common/types/context';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CurrentUserState {
  setUser: (user: CurrentUser) => void;
  user: CurrentUser | undefined;
}

const useCurrentUserStore = create<CurrentUserState>()(
  persist((set) => ({ user: undefined, setUser: (user) => set({ user }) }), {
    name: 'current-user',
    storage: createJSONStorage(() => sessionStorage),
  })
);

export const useCurrentUser = () => useCurrentUserStore((state) => state.user);
export const useSetUser = () => useCurrentUserStore((state) => state.setUser);
