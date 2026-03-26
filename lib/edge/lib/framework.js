import { edgeConfig } from '@/config/json/edge';
import { buildHeaders, getCurrentUser } from '../sdks/backend.js';
import { commonHandlerConfig } from '../../framework/callbacks.js';
export const edgeHandlerConfig = {
    ...commonHandlerConfig,
    authenticator,
};
async function authenticator(request) {
    const time = new Date();
    const { method, url, headers: originalHeaders } = request;
    const headers = buildHeaders(originalHeaders, {
        additionalEntries: { 'X-INTERNAL-SECRET': edgeConfig.internalSecret },
    });
    const currentUser = await getCurrentUser(headers);
    return { time, method, url, headers, currentUser };
}
//# sourceMappingURL=framework.js.map