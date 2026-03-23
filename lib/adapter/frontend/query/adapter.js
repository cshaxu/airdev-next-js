"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientQueryAdapter = void 0;
exports.setClientQueryAdapter = setClientQueryAdapter;
const defaults_1 = require("@airdev/next/adapter/defaults");
exports.clientQueryAdapter = defaults_1.defaultClientQueryAdapter;
function setClientQueryAdapter(adapter) {
    exports.clientQueryAdapter = adapter;
}
//# sourceMappingURL=adapter.js.map