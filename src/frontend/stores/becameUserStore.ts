import type { CurrentUser } from '@airdev/next/common/types/context';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface BecameUserState {
  setUser: (user: CurrentUser | null) => void;
  user: CurrentUser | null;
}

const useBecameUserStore = create<BecameUserState>()(
  persist((set) => ({ user: null, setUser: (user) => set({ user }) }), {
    name: 'became-user',
    storage: createJSONStorage(() => localStorage),
  })
);

export const useBecameUser = () => useBecameUserStore((state) => state.user);
export const useSetBecameUser = () =>
  useBecameUserStore((state) => state.setUser);
