"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseAdapter = void 0;
exports.setDatabaseAdapter = setDatabaseAdapter;
const defaults_1 = require("@airdev/next/adapter/defaults");
exports.databaseAdapter = defaults_1.defaultDatabaseAdapter;
function setDatabaseAdapter(adapter) {
    exports.databaseAdapter = adapter;
}
//# sourceMappingURL=adapter.js.map