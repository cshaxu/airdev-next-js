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
import { cn } from '@/frontend/lib/cn';
import { useCurrentUser } from '@/frontend/stores/currentUserStore';
import { ChatUserQueries } from '@/generated/tanstack-hooks/chat-user-client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Home, MessageCircle, Plus } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getChatSessionLabel, getChatSessionMeta } from './chat-session';

export default function Chats() {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: chatUsers } = useQuery({
    ...ChatUserQueries.getMany({ userId: currentUser?.id ?? '' }),
    enabled: !!currentUser,
  });
  const createChat = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/json/create-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to create chat.');
      }

      return (await response.json()) as {
        chat: { id: string; createdAt: string };
      };
    },
    onSuccess: async ({ chat }) => {
      await queryClient.invalidateQueries({
        queryKey: ChatUserQueries.getMany({ userId: currentUser?.id ?? '' })
          .queryKey,
      });
      router.push(`/chats/${chat.id}`);
    },
  });

  if (!currentUser || chatUsers === undefined) {
    return <Loading />;
  }

  const breadcrumbs: HeaderBarItem[] = [
    {
      label: '',
      href: '/dashboard',
      icon: <Home className="size-4" />,
    },
    { label: 'Chats' },
  ];

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <HeaderBar
        items={breadcrumbs}
        isLoading={chatUsers === undefined}
        actions={
          <Button
            size="sm"
            className="rounded-full"
            onClick={() => createChat.mutate()}
            isLoading={createChat.isPending}
          >
            <Plus className="size-4" />
            New chat
          </Button>
        }
      />
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="size-full overflow-y-auto p-6">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
            <section className="rounded-[28px] border border-[var(--blue-separator)] bg-linear-to-br from-white via-[var(--blue-1)] to-[var(--blue-3)] p-8 shadow-[0_24px_80px_-48px_rgba(2,147,238,0.45)]">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium tracking-[0.24em] text-[var(--blue-9)] uppercase">
                    Chat workspace
                  </p>
                  <h1 className="text-3xl font-semibold tracking-tight text-[var(--blue-12)]">
                    Pick up an existing conversation.
                  </h1>
                  <p className="max-w-2xl text-sm leading-6 text-[var(--blue-dark-75)]">
                    Sessions are listed from the account chat membership feed
                    and open directly into the live stream view.
                  </p>
                </div>
                <div className="rounded-full bg-white/80 px-4 py-2 text-sm font-medium text-[var(--blue-12)] shadow-sm">
                  {chatUsers.length} total chats
                </div>
              </div>
            </section>

            {chatUsers.length === 0 ? (
              <Card className="rounded-[28px] border-dashed border-[var(--blue-separator)] bg-[var(--blue-bg)] py-10 text-center shadow-none">
                <CardHeader className="items-center">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white text-[var(--blue-9)] shadow-sm">
                    <MessageCircle className="size-6" />
                  </div>
                  <CardTitle className="text-2xl text-[var(--blue-12)]">
                    No chats yet
                  </CardTitle>
                  <CardDescription className="max-w-md text-sm leading-6 text-[var(--blue-dark-75)]">
                    Create the first session for this account and the app will
                    open it immediately.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button
                    onClick={() => createChat.mutate()}
                    isLoading={createChat.isPending}
                  >
                    <Plus className="size-4" />
                    Start first chat
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {chatUsers.map((chatUser) => (
                  <Link key={chatUser.id} href={`/chats/${chatUser.chatId}`}>
                    <Card
                      className={cn(
                        'h-full rounded-[24px] border-[var(--blue-separator)] bg-white/95 transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-40px_rgba(32,54,86,0.65)]'
                      )}
                    >
                      <CardHeader className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex size-11 items-center justify-center rounded-2xl bg-[var(--blue-hover)] text-[var(--blue-9)]">
                            <MessageCircle className="size-5" />
                          </div>
                          <span className="rounded-full bg-[var(--blue-1)] px-3 py-1 text-xs font-medium text-[var(--blue-9)]">
                            Live
                          </span>
                        </div>
                        <div className="space-y-1">
                          <CardTitle className="line-clamp-2 text-lg text-[var(--blue-12)]">
                            {getChatSessionLabel(
                              chatUser.chatId,
                              chatUser.createdAt
                            )}
                          </CardTitle>
                          <CardDescription className="text-sm text-[var(--blue-dark-75)]">
                            {getChatSessionMeta(chatUser.createdAt)}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="rounded-2xl bg-[var(--blue-bg)] px-4 py-3 text-sm text-[var(--blue-dark-75)]">
                          Open the session to continue the message stream.
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
