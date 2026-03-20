import CookieBanner from '@/frontend/components/Cookies/CookieBanner';
import ErrorBoundary from '@/frontend/components/ErrorBoundary';
import PosthogInit from '@/frontend/components/PosthogInit';
import ReactQueryProvider from '@/frontend/components/ReactQueryProvider';
import ThemeProvider from '@/frontend/components/theme/ThemeProvider';
import { Toaster } from '@/frontend/components/ui/Toaster';
import '@/frontend/styles/globals.css';
import { ReactNodeProps } from '@/frontend/types/props';
import { pageTitle } from '@/frontend/utils/page';
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
    <html lang="en" className={frutiger.className}>
      <body suppressHydrationWarning>
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
