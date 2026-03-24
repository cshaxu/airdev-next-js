import { publicConfig } from '@/config/public';
import { Toaster } from '@/package/frontend/components/ui/Toaster';
import ErrorBoundary from '@/package/frontend/components/ErrorBoundary';
import ReactQueryProvider from '@/package/frontend/components/ReactQueryProvider';
import ThemeProvider from '@/package/frontend/components/theme/ThemeProvider';
import '@/package/frontend/styles/globals.css';
import { ReactNodeProps } from '@/package/frontend/types/props';
import { pageTitle } from '@/package/frontend/utils/page';
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
      images: [{ url: '/logo.png', alt: publicConfig.app.name }],
    },
    twitter: {
      card: 'summary',
      title: pageTitle(),
      description: publicConfig.app.description,
      images: ['/logo.png'],
    },
    icons: { icon: '/logo.png', apple: '/logo.png' },
  };
}

const frutiger = localFont({
  src: '../../fonts/Frutiger55Roman.woff2',
  display: 'swap',
});

export default function RootLayout({ children }: ReactNodeProps) {
  return (
    <html lang="en" className={frutiger.className} suppressHydrationWarning>
      <body>
        <ErrorBoundary>
          <ReactQueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem={false}
              disableTransitionOnChange
            >
              <NuqsAdapter>
                {children}
                <CookieBanner />
                <Toaster />
                <Suspense>
                  <PosthogInit />
                </Suspense>
              </NuqsAdapter>
            </ThemeProvider>
          </ReactQueryProvider>
        </ErrorBoundary>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
