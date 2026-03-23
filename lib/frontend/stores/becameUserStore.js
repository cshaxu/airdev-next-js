"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetBecameUser = exports.useBecameUser = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const useBecameUserStore = (0, zustand_1.create)()((0, middleware_1.persist)((set) => ({ user: null, setUser: (user) => set({ user }) }), {
    name: 'became-user',
    storage: (0, middleware_1.createJSONStorage)(() => localStorage),
}));
const useBecameUser = () => useBecameUserStore((state) => state.user);
exports.useBecameUser = useBecameUser;
const useSetBecameUser = () => useBecameUserStore((state) => state.setUser);
exports.useSetBecameUser = useSetBecameUser;
//# sourceMappingURL=becameUserStore.js.map