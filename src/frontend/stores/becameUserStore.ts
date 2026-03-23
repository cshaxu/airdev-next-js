import type { SearchUser } from '@airdev/next/adapter/frontend/query/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface BecameUserState {
  setUser: (user: SearchUser | null) => void;
  user: SearchUser | null;
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
