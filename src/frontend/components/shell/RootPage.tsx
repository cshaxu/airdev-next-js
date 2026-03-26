import { clientComponentConfig } from '@/config/component/client';
import { publicConfig } from '@/config/json/public';
import { currentUserServerQueryOptions } from '@/frontend/hooks/data/user-server';
import { pageTitle, withError } from '@/frontend/utils/page';
import { QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export async function generateRootPageMetadata(): Promise<Metadata> {
  return {
    title: pageTitle(publicConfig.app.name),
    description: publicConfig.app.description,
    alternates: { canonical: '/' },
  };
}

async function RootPage() {
  const queryClient = new QueryClient();
  const currentUser = await queryClient.fetchQuery(
    currentUserServerQueryOptions
  );
  if (currentUser !== null) {
    redirect(publicConfig.shell.routes.homeHref);
  }

  const { LandingPage } = clientComponentConfig;
  return <LandingPage />;
}

export default withError(RootPage);
