'use client';

import Loading from '@/app/loading';
import HeaderBar, { HeaderBarItem } from '@/frontend/components/HeaderBar';
import { Button } from '@/frontend/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/frontend/components/ui/Card';
import { useCurrentUser } from '@/frontend/stores/currentUserStore';
import { ChatUserQueries } from '@/generated/tanstack-hooks/chat-user-client';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Home, MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

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
  const userId = currentUser?.id;
  const { data, isLoading } = useQuery({
    ...ChatUserQueries.getMany({ userId: userId ?? '' }),
    enabled: !!userId,
  });

  if (!currentUser || isLoading) {
    return <Loading />;
  }

  const totalChats = data?.length ?? 0;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <HeaderBar items={breadcrumbs} />
      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <section className="rounded-[28px] border border-[var(--blue-separator)] bg-linear-to-br from-white via-[var(--blue-1)] to-[var(--blue-3)] p-8 shadow-[0_24px_80px_-48px_rgba(2,147,238,0.45)]">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl space-y-3">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-[var(--blue-9)] shadow-sm">
                  <Sparkles className="size-3.5" />
                  Workspace overview
                </div>
                <h1 className="text-3xl font-semibold tracking-tight text-[var(--blue-12)]">
                  Keep an eye on active conversations.
                </h1>
                <p className="max-w-xl text-sm leading-6 text-[var(--blue-dark-75)]">
                  This dashboard gives the template a real landing point: a
                  quick account summary and a direct path into chat sessions.
                </p>
              </div>

              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/chats">
                  Open chats
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <Card className="rounded-[24px] border-[var(--blue-separator)] bg-white/90 shadow-[0_18px_50px_-40px_rgba(32,54,86,0.55)]">
              <CardHeader>
                <CardDescription>Total chats</CardDescription>
                <CardTitle className="text-4xl font-semibold text-[var(--blue-12)]">
                  {totalChats}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center gap-3 text-sm text-[var(--blue-dark-75)]">
                <div className="flex size-10 items-center justify-center rounded-2xl bg-[var(--blue-hover)] text-[var(--blue-9)]">
                  <MessageCircle className="size-5" />
                </div>
                All conversations currently attached to this account.
              </CardContent>
            </Card>

            <Card className="rounded-[24px] border-[var(--blue-separator)] bg-[var(--blue-bg)] shadow-[0_18px_50px_-40px_rgba(32,54,86,0.55)]">
              <CardHeader>
                <CardDescription>Next step</CardDescription>
                <CardTitle className="text-xl font-semibold text-[var(--blue-12)]">
                  Continue a session or start a new one.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  variant="outline"
                  className="border-[var(--blue-separator)] bg-white"
                >
                  <Link href="/chats">Go to chat list</Link>
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
