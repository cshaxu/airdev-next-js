import { publicConfig } from '@airdev/next/common/config';
import CookieBanner from '@airdev/next/frontend/components/shell/CookieBanner';
import ErrorBoundary from '@airdev/next/frontend/components/shell/ErrorBoundary';
import PosthogInit from '@airdev/next/frontend/components/shell/PosthogInit';
import { Toaster } from '@airdev/next/frontend/components/ui/Toaster';
import ReactQueryProvider from '@airdev/next/frontend/providers/ReactQueryProvider';
import ThemeProvider from '@airdev/next/frontend/providers/ThemeProvider';
import '@airdev/next/frontend/styles/globals.css';
import { ReactNodeProps } from '@airdev/next/frontend/types/props';
import { pageTitle } from '@airdev/next/frontend/utils/page';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';

const frutiger = localFont({
  src: '../../app/fonts/Frutiger55Roman.woff2',
  display: 'swap',
});

export const metadata = { title: pageTitle(), description: '' };

export default async function RootLayout({ children }: ReactNodeProps) {
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
                <Suspense>
                  <PosthogInit
                    apiHost={publicConfig.posthog.apiHost}
                    apiToken={publicConfig.posthog.apiToken}
                    environment={publicConfig.service.environment}
                  />
                </Suspense>
              </NuqsAdapter>
            </ThemeProvider>
          </ReactQueryProvider>
        </ErrorBoundary>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
