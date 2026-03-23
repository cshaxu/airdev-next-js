"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBackendJsonJsonWith = exports.handleBackendAnyJsonWith = exports.handleBackendJsonAnyWith = exports.handleBackendAnyAnyWith = void 0;
const api_1 = require("@airent/api");
const api_next_1 = require("@airent/api-next");
const framework_1 = require("./framework");
// any in, any out
const handleBackendAnyAnyWith = (config) => (0, api_next_1.handleWith)((0, api_1.dispatchWith)({ ...framework_1.dispatcherConfig, ...config }), {
    ...framework_1.handlerConfig,
    isCustomResponse: true,
});
exports.handleBackendAnyAnyWith = handleBackendAnyAnyWith;
// json in, any out
const handleBackendJsonAnyWith = (config) => (0, exports.handleBackendAnyAnyWith)({
    ...config,
    parser: (0, api_1.parseBodyWith)(config.bodyZod),
});
exports.handleBackendJsonAnyWith = handleBackendJsonAnyWith;
// any in, json out
const handleBackendAnyJsonWith = (config) => (0, api_next_1.handleWith)((0, api_1.dispatchWith)({ ...framework_1.dispatcherConfig, ...config }), framework_1.handlerConfig);
exports.handleBackendAnyJsonWith = handleBackendAnyJsonWith;
// json in, json out
const handleBackendJsonJsonWith = (config) => (0, exports.handleBackendAnyJsonWith)({
    ...config,
    parser: (0, api_1.parseBodyWith)(config.bodyZod),
});
exports.handleBackendJsonJsonWith = handleBackendJsonJsonWith;
//# sourceMappingURL=handlers.js.map