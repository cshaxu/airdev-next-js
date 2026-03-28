/* "@airdev/next": "managed" */

import { airdevPublicConfig } from '@/airdev/config/public';
import ErrorBoundary from '@/airdev/frontend/components/ErrorBoundary';
import ReactQueryProvider from '@/airdev/frontend/components/ReactQueryProvider';
import ThemeProvider from '@/airdev/frontend/components/theme/ThemeProvider';
import { Toaster } from '@/airdev/frontend/components/ui/Toaster';
import '@/airdev/frontend/styles/globals.css';
import { ReactNodeProps } from '@/airdev/frontend/types/props';
import { pageTitle } from '@/airdev/frontend/utils/page';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';
import CookieBanner from './CookieBanner';
import PosthogInit from './PosthogInit';

export function generateRootLayoutMetadata() {
  return {
    metadataBase: new URL(airdevPublicConfig.service.baseUrl),
    title: pageTitle(),
    description: airdevPublicConfig.app.description,
    applicationName: airdevPublicConfig.app.name,
    authors: [{ name: airdevPublicConfig.app.owner }],
    creator: airdevPublicConfig.app.owner,
    publisher: airdevPublicConfig.app.owner,
    keywords: airdevPublicConfig.app.keywords,
    robots: { index: true, follow: true },
    openGraph: {
      type: 'website',
      url: airdevPublicConfig.service.baseUrl,
      siteName: airdevPublicConfig.app.name,
      title: pageTitle(),
      description: airdevPublicConfig.app.description,
      images: [
        {
          url: airdevPublicConfig.shell.assets.logoSrc,
          alt: airdevPublicConfig.app.name,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: pageTitle(),
      description: airdevPublicConfig.app.description,
      images: [airdevPublicConfig.shell.assets.logoSrc],
    },
    icons: {
      icon: airdevPublicConfig.shell.assets.logoSrc,
      apple: airdevPublicConfig.shell.assets.logoSrc,
    },
  };
}

const frutiger = localFont({
  src: '../../../assets/Frutiger55Roman.woff2',
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
