"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.shellAdapter = exports.setShellAdapter = exports.setClientQueryAdapter = exports.clientQueryAdapter = void 0;
var adapter_1 = require("./frontend/query/adapter");
Object.defineProperty(exports, "clientQueryAdapter", { enumerable: true, get: function () { return adapter_1.clientQueryAdapter; } });
Object.defineProperty(exports, "setClientQueryAdapter", { enumerable: true, get: function () { return adapter_1.setClientQueryAdapter; } });
var adapter_2 = require("./frontend/shell/adapter");
Object.defineProperty(exports, "setShellAdapter", { enumerable: true, get: function () { return adapter_2.setShellAdapter; } });
Object.defineProperty(exports, "shellAdapter", { enumerable: true, get: function () { return adapter_2.shellAdapter; } });
__exportStar(require("./private-config"), exports);
__exportStar(require("./public-config"), exports);
//# sourceMappingURL=index.js.map