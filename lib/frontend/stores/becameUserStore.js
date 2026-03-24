import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
const useBecameUserStore = create()(persist((set) => ({ user: null, setUser: (user) => set({ user }) }), {
    name: 'became-user',
    storage: createJSONStorage(() => localStorage),
}));
export const useBecameUser = () => useBecameUserStore((state) => state.user);
export const useSetBecameUser = () => useBecameUserStore((state) => state.setUser);
//# sourceMappingURL=becameUserStore.js.map