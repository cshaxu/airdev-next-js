"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePageMetadata = generatePageMetadata;
exports.pageTitle = pageTitle;
exports.withError = withError;
const framework_1 = require("@airdev/next/adapter/backend/framework");
const config_1 = require("@airdev/next/common/config");
const navigation_1 = require("next/navigation");
async function generatePageMetadata(_path, _searchParams = {}, defaultTitle = config_1.publicConfig.app.name) {
    return generateDefaultMetadata(defaultTitle);
}
function generateDefaultMetadata(defaultTitle) {
    return { title: pageTitle(defaultTitle) };
}
function pageTitle(title, showProduction) {
    const { app, service } = config_1.publicConfig;
    const prefix = `${service.environment !== 'production' || showProduction ? `[${service.titlePrefix}] ` : ''}`;
    const name = title?.length ? `${title} | ${app.name}` : app.name;
    return `${prefix}${name}`;
}
function withError(fn, onError) {
    return async (...args) => {
        try {
            return await fn(...args);
        }
        catch (error) {
            if (error.message === 'NEXT_REDIRECT') {
                throw error;
            }
            framework_1.frameworkAdapter.logError(error);
            if (onError) {
                return onError(error);
            }
            else if (error.status === 404) {
                return (0, navigation_1.notFound)();
            }
            else {
                throw error;
            }
        }
    };
}
//# sourceMappingURL=page.js.map