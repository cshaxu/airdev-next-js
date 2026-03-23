"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PosthogInit;
const navigation_1 = require("next/navigation");
const posthog_js_1 = __importDefault(require("posthog-js"));
const react_1 = require("react");
let initialized = false;
function PosthogInit({ apiHost, apiToken, environment }) {
    const searchParams = (0, navigation_1.useSearchParams)();
    const forcePosthog = ['1', 'true'].includes(searchParams.get('forcePosthog')?.toLowerCase() ?? '');
    (0, react_1.useEffect)(() => {
        if (initialized || (environment !== 'production' && !forcePosthog)) {
            return;
        }
        posthog_js_1.default.init(apiToken, {
            api_host: apiHost,
            capture_pageview: false, // Disable automatic pageview capture, as we capture manually
            capture_pageleave: true, // Enable pageleave capture
        });
        initialized = true;
    }, [environment, forcePosthog, apiToken, apiHost]);
    return null;
}
//# sourceMappingURL=PosthogInit.js.map