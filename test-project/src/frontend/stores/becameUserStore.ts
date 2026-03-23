import { SearchSelectedUserResponse } from '@/generated/tanstack-hooks/user-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface BecameUserState {
  user: SearchSelectedUserResponse | null;
  setUser: (user: SearchSelectedUserResponse | null) => void;
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
