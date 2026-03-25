import { edgeFunctionConfig } from '@/config/function/edge';
import { ContextUserFieldRequest } from '../../framework/context';
import { HEADER_CURRENT_USER_ID_KEY } from '@airdev/next/common/constant';
export const getCurrentUser = async (headers, isReal = false) => edgeFunctionConfig.apiClient.user
    .getOneSafe({ id: 'me' }, ContextUserFieldRequest, isReal
    ? buildHeaders(headers, {
        excludedCookieKeys: [HEADER_CURRENT_USER_ID_KEY],
        excludedHeaderKeys: [HEADER_CURRENT_USER_ID_KEY],
    })
    : headers)
    .then((data) => data.user);
export function buildHeaders(headers, options = {}) {
    const cookie = headers.get('cookie');
    const newCookie = cookie === null
        ? null
        : cookie
            .split(';')
            .map((e) => e.trim().split('='))
            .filter(([k, _v]) => !(options.excludedCookieKeys ?? []).includes(k))
            .map((e) => e.join('='))
            .join('; ');
    const newHeaderEntries = Array.from(headers.entries())
        .filter(([k, _v]) => !(options.excludedHeaderKeys ?? []).includes(k))
        .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {});
    return new Headers({
        ...newHeaderEntries,
        ...options.additionalEntries,
        ...(newCookie?.length && { cookie: newCookie }),
    });
}
//# sourceMappingURL=backend.js.map