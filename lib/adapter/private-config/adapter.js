"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateConfigAdapter = void 0;
exports.setPrivateConfigAdapter = setPrivateConfigAdapter;
const defaults_1 = require("@airdev/next/adapter/defaults");
exports.privateConfigAdapter = defaults_1.defaultPrivateConfig;
function setPrivateConfigAdapter(config) {
    exports.privateConfigAdapter = config;
}
//# sourceMappingURL=adapter.js.map