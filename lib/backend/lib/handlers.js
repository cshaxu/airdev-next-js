import { dispatchWith, parseBodyWith } from '@airent/api';
import { handleWith } from '@airent/api-next';
import { dispatcherConfig, handlerConfig } from './framework';
// any in, any out
export const handleBackendAnyAnyWith = (config) => handleWith(dispatchWith({ ...dispatcherConfig, ...config }), {
    ...handlerConfig,
    isCustomResponse: true,
});
// json in, any out
export const handleBackendJsonAnyWith = (config) => handleBackendAnyAnyWith({
    ...config,
    parser: parseBodyWith(config.bodyZod),
});
// any in, json out
export const handleBackendAnyJsonWith = (config) => handleWith(dispatchWith({ ...dispatcherConfig, ...config }), handlerConfig);
// json in, json out
export const handleBackendJsonJsonWith = (config) => handleBackendAnyJsonWith({
    ...config,
    parser: parseBodyWith(config.bodyZod),
});
//# sourceMappingURL=handlers.js.map