import { commonFunctionConfig } from '@/config/function/common';
import { publicConfig } from '@/config/public';
import { notFound } from 'next/navigation';
export async function generatePageMetadata(_path, _searchParams = {}, defaultTitle = publicConfig.app.name) {
    return generateDefaultMetadata(defaultTitle);
}
function generateDefaultMetadata(defaultTitle) {
    return { title: pageTitle(defaultTitle) };
}
export function pageTitle(title, showProduction) {
    const prefix = `${publicConfig.service.serviceEnvironment !== 'production' || showProduction ? `[${publicConfig.service.titlePrefix}] ` : ''}`;
    const name = title?.length
        ? `${title} | ${publicConfig.app.name}`
        : publicConfig.app.name;
    return `${prefix}${name}`;
}
export function withError(fn, onError) {
    return async (...args) => {
        try {
            return await fn(...args);
        }
        catch (error) {
            if (error.message === 'NEXT_REDIRECT') {
                throw error;
            }
            commonFunctionConfig.logError(error);
            if (onError) {
                return onError(error);
            }
            else if (error.status === 404) {
                return notFound();
            }
            else {
                throw error;
            }
        }
    };
}
//# sourceMappingURL=page.js.map