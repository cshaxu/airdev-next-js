"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiClientAdapter = void 0;
exports.setApiClientAdapter = setApiClientAdapter;
const defaults_1 = require("@airdev/next/adapter/defaults");
exports.apiClientAdapter = defaults_1.defaultApiClientAdapter;
function setApiClientAdapter(adapter) {
    exports.apiClientAdapter = adapter;
}
//# sourceMappingURL=adapter.js.map