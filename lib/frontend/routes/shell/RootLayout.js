"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
const config_1 = require("@airdev/next/common/config");
const CookieBanner_1 = __importDefault(require("@airdev/next/frontend/components/shell/CookieBanner"));
const ErrorBoundary_1 = __importDefault(require("@airdev/next/frontend/components/shell/ErrorBoundary"));
const PosthogInit_1 = __importDefault(require("@airdev/next/frontend/components/shell/PosthogInit"));
const Toaster_1 = require("@airdev/next/frontend/components/ui/Toaster");
const ReactQueryProvider_1 = __importDefault(require("@airdev/next/frontend/providers/ReactQueryProvider"));
const ThemeProvider_1 = __importDefault(require("@airdev/next/frontend/providers/ThemeProvider"));
require("@airdev/next/frontend/styles/globals.css");
const page_1 = require("@airdev/next/frontend/utils/page");
const next_1 = require("@vercel/analytics/next");
const next_2 = require("@vercel/speed-insights/next");
const local_1 = __importDefault(require("next/font/local"));
const app_1 = require("nuqs/adapters/next/app");
const react_1 = require("react");
const frutiger = (0, local_1.default)({
    src: '../../app/fonts/Frutiger55Roman.woff2',
    display: 'swap',
});
exports.metadata = { title: (0, page_1.pageTitle)(), description: '' };
async function RootLayout({ children }) {
    return ((0, jsx_runtime_1.jsx)("html", { lang: "en", className: frutiger.className, suppressHydrationWarning: true, children: (0, jsx_runtime_1.jsxs)("body", { children: [(0, jsx_runtime_1.jsx)(ErrorBoundary_1.default, { children: (0, jsx_runtime_1.jsx)(ReactQueryProvider_1.default, { children: (0, jsx_runtime_1.jsx)(ThemeProvider_1.default, { attribute: "class", defaultTheme: "light", enableSystem: false, disableTransitionOnChange: true, children: (0, jsx_runtime_1.jsxs)(app_1.NuqsAdapter, { children: [children, (0, jsx_runtime_1.jsx)(CookieBanner_1.default, {}), (0, jsx_runtime_1.jsx)(react_1.Suspense, { children: (0, jsx_runtime_1.jsx)(PosthogInit_1.default, { apiHost: config_1.publicConfig.posthog.apiHost, apiToken: config_1.publicConfig.posthog.apiToken, environment: config_1.publicConfig.service.environment }) })] }) }) }) }), (0, jsx_runtime_1.jsx)(Toaster_1.Toaster, {}), (0, jsx_runtime_1.jsx)(next_1.Analytics, {}), (0, jsx_runtime_1.jsx)(next_2.SpeedInsights, {})] }) }));
}
//# sourceMappingURL=RootLayout.js.map