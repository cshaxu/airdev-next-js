import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
const useCurrentUserStore = create()(persist((set) => ({ user: undefined, setUser: (user) => set({ user }) }), {
    name: 'current-user',
    storage: createJSONStorage(() => sessionStorage),
}));
export const useCurrentUser = () => useCurrentUserStore((state) => state.user);
export const useSetUser = () => useCurrentUserStore((state) => state.setUser);
//# sourceMappingURL=currentUserStore.js.map