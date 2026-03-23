import CookieBanner from '@airdev/next/frontend/components/Cookies/CookieBanner';
import ErrorBoundary from '@airdev/next/frontend/components/ErrorBoundary';
import PosthogInit from '@airdev/next/frontend/components/PosthogInit';
import ReactQueryProvider from '@airdev/next/frontend/components/ReactQueryProvider';
import ThemeProvider from '@airdev/next/frontend/components/theme/ThemeProvider';
import { Toaster } from '@airdev/next/frontend/components/ui/Toaster';
import '@airdev/next/frontend/styles/globals.css';
import { ReactNodeProps } from '@airdev/next/frontend/types/props';
import { pageTitle } from '@airdev/next/frontend/utils/page';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import localFont from 'next/font/local';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from 'react';

const frutiger = localFont({
  src: './fonts/Frutiger55Roman.woff2',
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
              defaultTheme="light" // "system"
              enableSystem={false} // {true}
              disableTransitionOnChange
            >
              <NuqsAdapter>
                {children}
                <CookieBanner />
                <Suspense>
                  <PosthogInit />
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
