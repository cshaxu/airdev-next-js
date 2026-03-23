"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProviders = getProviders;
const code_1 = require("./code");
const google_1 = require("./google");
function getProviders() {
    return [code_1.codeProvider, ...[(0, google_1.getGoogleProvider)()].filter(Boolean)];
}
//# sourceMappingURL=index.js.map