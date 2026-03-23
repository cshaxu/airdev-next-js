"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frameworkAdapter = void 0;
exports.setFrameworkAdapter = setFrameworkAdapter;
const defaults_1 = require("@airdev/next/adapter/defaults");
exports.frameworkAdapter = defaults_1.defaultFrameworkAdapter;
function setFrameworkAdapter(adapter) {
    exports.frameworkAdapter = adapter;
}
//# sourceMappingURL=adapter.js.map