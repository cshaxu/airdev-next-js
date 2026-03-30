/* "@airdev/next": "managed" */

'use client';

import { Button } from '@/airdev/frontend/components/ui/Button';
import { useCurrentUser } from '@/airdev/frontend/stores/currentUserStore';
import Loading from '@/app/loading';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/frontend/components/ui/Card';
import { ArrowRight, Home, Settings, Sparkles } from 'lucide-react';
import Link from 'next/link';
import HeaderBar, { type HeaderBarItem } from './HeaderBar';

const breadcrumbs: HeaderBarItem[] = [
  {
    label: '',
    href: '/dashboard',
    icon: <Home className="size-4" />,
  },
  { label: 'Dashboard' },
];

export default function Dashboard() {
  const currentUser = useCurrentUser();

  if (!currentUser) {
    return <Loading />;
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <HeaderBar items={breadcrumbs} />
      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <section className="rounded-[28px] border border-[var(--blue-separator)] bg-linear-to-br from-[var(--blue-1)] via-[var(--blue-2)] to-[var(--blue-3)] p-8 shadow-[var(--shell-hero-shadow)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--blue-surface)] px-3 py-1 text-xs font-medium text-[var(--blue-9)] shadow-sm">
                  <Sparkles className="size-3.5" />
                  Starter workspace
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-[var(--blue-12)]">
                  Signed in and ready to build.
                </h1>
                <p className="max-w-xl text-sm leading-6 text-[var(--blue-dark-75)]">
                  This template keeps the framework scaffolding in place while
                  leaving the product layer intentionally minimal.
                </p>
              </div>

              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/settings">
                  Open settings
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <Card className="rounded-[24px] border-[var(--blue-separator)] bg-[var(--blue-surface)] shadow-[var(--shell-panel-shadow)]">
              <CardHeader>
                <CardDescription>Signed in as</CardDescription>
                <CardTitle className="text-2xl font-semibold text-[var(--blue-12)]">
                  {currentUser.name || currentUser.email}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[var(--blue-dark-75)]">
                Use this page as the neutral starting point for your
                app-specific dashboard, onboarding flow, or product home.
              </CardContent>
            </Card>

            <Card className="rounded-[24px] border-[var(--blue-separator)] bg-[var(--blue-bg)] shadow-[var(--shell-panel-shadow)]">
              <CardHeader>
                <CardDescription>Next step</CardDescription>
                <CardTitle className="text-xl font-semibold text-[var(--blue-12)]">
                  Configure your project and add your first domain model.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="border-[var(--blue-separator)] bg-[var(--blue-surface)] hover:bg-[var(--blue-3)]"
                >
                  <Link href="/admin/test">
                    <Settings className="size-4" />
                    Open admin test
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
