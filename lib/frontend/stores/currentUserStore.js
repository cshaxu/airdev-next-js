"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetUser = exports.useCurrentUser = void 0;
const zustand_1 = require("zustand");
const middleware_1 = require("zustand/middleware");
const useCurrentUserStore = (0, zustand_1.create)()((0, middleware_1.persist)((set) => ({ user: undefined, setUser: (user) => set({ user }) }), {
    name: 'current-user',
    storage: (0, middleware_1.createJSONStorage)(() => sessionStorage),
}));
const useCurrentUser = () => useCurrentUserStore((state) => state.user);
exports.useCurrentUser = useCurrentUser;
const useSetUser = () => useCurrentUserStore((state) => state.setUser);
exports.useSetUser = useSetUser;
//# sourceMappingURL=currentUserStore.js.map