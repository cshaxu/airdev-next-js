"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextauthAdapter = void 0;
exports.setNextauthAdapter = setNextauthAdapter;
const defaults_1 = require("@airdev/next/adapter/defaults");
exports.nextauthAdapter = defaults_1.defaultNextauthAdapter;
function setNextauthAdapter(adapter) {
    exports.nextauthAdapter = adapter;
}
//# sourceMappingURL=adapter.js.map