import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { publicConfig } from '@/config/public';
import { shellConfig } from '@/config/shell';
import { Toaster } from '../ui/Toaster';
import ErrorBoundary from '../ErrorBoundary';
import ReactQueryProvider from '../ReactQueryProvider';
import ThemeProvider from '../theme/ThemeProvider';
import '../../styles/globals.css';
import { pageTitle } from '../../utils/page';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';
import CookieBanner from './CookieBanner';
import PosthogInit from './PosthogInit';
export function generateRootLayoutMetadata() {
    return {
        metadataBase: new URL(publicConfig.service.baseUrl),
        title: pageTitle(),
        description: publicConfig.app.description,
        applicationName: publicConfig.app.name,
        authors: [{ name: publicConfig.app.owner }],
        creator: publicConfig.app.owner,
        publisher: publicConfig.app.owner,
        keywords: publicConfig.app.keywords,
        robots: { index: true, follow: true },
        openGraph: {
            type: 'website',
            url: publicConfig.service.baseUrl,
            siteName: publicConfig.app.name,
            title: pageTitle(),
            description: publicConfig.app.description,
            images: [{ url: shellConfig.assets.logoSrc, alt: publicConfig.app.name }],
        },
        twitter: {
            card: 'summary',
            title: pageTitle(),
            description: publicConfig.app.description,
            images: [shellConfig.assets.logoSrc],
        },
        icons: {
            icon: shellConfig.assets.logoSrc,
            apple: shellConfig.assets.logoSrc,
        },
    };
}
const frutiger = localFont({
    src: '../../assets/Frutiger55Roman.woff2',
    display: 'swap',
});
export default function RootLayout({ children }) {
    return (_jsx("html", { lang: "en", className: frutiger.className, suppressHydrationWarning: true, children: _jsxs("body", { children: [_jsx(ErrorBoundary, { children: _jsx(ReactQueryProvider, { children: _jsx(ThemeProvider, { attribute: "class", defaultTheme: "light", enableSystem: false, disableTransitionOnChange: true, children: _jsxs(NuqsAdapter, { children: [children, _jsx(CookieBanner, {}), _jsx(Toaster, {}), _jsx(Suspense, { children: _jsx(PosthogInit, {}) })] }) }) }) }), _jsx(Analytics, {}), _jsx(SpeedInsights, {})] }) }));
}
//# sourceMappingURL=RootLayout.js.map