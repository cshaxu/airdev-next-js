import { commonDispatcherConfig, } from '@airdev/next/framework/callbacks';
import { dispatchWith } from '@airent/api';
import { handleWith } from '@airent/api-next';
import { edgeHandlerConfig } from './framework';
export const handleEdgeWith = (config) => handleWith(dispatchWith({ ...commonDispatcherConfig, ...config }), edgeHandlerConfig);
//# sourceMappingURL=handlers.js.map