"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CurrentUserProvider;
const user_1 = require("@airdev/next/frontend/hooks/data/user");
const currentUserStore_1 = require("@airdev/next/frontend/stores/currentUserStore");
const react_1 = require("react");
function CurrentUserProvider() {
    const setUser = (0, currentUserStore_1.useSetUser)();
    const { data: currentUser } = (0, user_1.useNullableCurrentUser)();
    (0, react_1.useEffect)(() => {
        if (currentUser) {
            setUser(currentUser);
        }
    }, [currentUser, setUser]);
    return null;
}
//# sourceMappingURL=CurrentUserProvider.js.map