"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicConfigAdapter = void 0;
exports.setPublicConfigAdapter = setPublicConfigAdapter;
const defaults_1 = require("@airdev/next/adapter/defaults");
exports.publicConfigAdapter = defaults_1.defaultPublicConfig;
function setPublicConfigAdapter(config) {
    exports.publicConfigAdapter = config;
}
//# sourceMappingURL=adapter.js.map