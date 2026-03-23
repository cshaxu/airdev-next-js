"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverApiClientAdapter = void 0;
exports.setServerApiClientAdapter = setServerApiClientAdapter;
const defaults_1 = require("@airdev/next/adapter/defaults");
exports.serverApiClientAdapter = defaults_1.defaultServerApiClientAdapter;
function setServerApiClientAdapter(adapter) {
    exports.serverApiClientAdapter = adapter;
}
//# sourceMappingURL=adapter.js.map