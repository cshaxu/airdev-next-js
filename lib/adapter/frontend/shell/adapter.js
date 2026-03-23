"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shellAdapter = void 0;
exports.setShellAdapter = setShellAdapter;
const defaults_1 = require("@airdev/next/adapter/defaults");
exports.shellAdapter = defaults_1.defaultShellAdapter;
function setShellAdapter(adapter) {
    exports.shellAdapter = {
        ...defaults_1.defaultShellAdapter,
        ...adapter,
        navigation: {
            ...defaults_1.defaultShellAdapter.navigation,
            ...adapter.navigation,
            primaryItems: adapter.navigation?.primaryItems ??
                defaults_1.defaultShellAdapter.navigation.primaryItems,
            adminTabItems: [
                { key: 'users', label: 'Users', href: '/admin/users' },
                { key: 'api', label: 'API', href: '/admin/api' },
                ...adapter.navigation.adminTabItems,
            ],
        },
        component: { ...adapter.component },
    };
}
//# sourceMappingURL=adapter.js.map