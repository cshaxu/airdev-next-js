'use client';

import {
  getChatSessionLabel,
  getChatSessionMeta,
} from '@/app/(protected)/chats/components/chat-session';
import Loading from '@/app/loading';
import ChatBox from '@/frontend/components/ChatBox/ChatBox';
import HeaderBar, { HeaderBarItem } from '@/frontend/components/HeaderBar';
import { Button } from '@/frontend/components/ui/Button';
import { useCurrentChatActions } from '@/frontend/stores/useCurrentChatStore';
import {
  ChatQueries,
  useUpdateOneChat,
} from '@/generated/tanstack-hooks/chat-client';
import { useQuery } from '@tanstack/react-query';
import { Home, MessageCircle, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

type Props = {
  chatId: string;
};

export default function ChatSession({ chatId }: Props) {
  const { setChatId, reset, clear } = useCurrentChatActions();
  const { data: chat } = useQuery({
    ...ChatQueries.getOne({ id: chatId }),
  });
  const clearChat = useUpdateOneChat({
    onSuccess: () => {
      clear();
    },
  });

  useEffect(() => {
    reset();
    setChatId(chatId);

    return () => {
      reset();
    };
  }, [chatId, reset, setChatId]);

  if (chat === undefined) {
    return <Loading />;
  }

  const sessionLabel = getChatSessionLabel(
    chatId,
    chat.createdAt,
    chat.summary
  );
  const breadcrumbs: HeaderBarItem[] = [
    {
      label: '',
      href: '/dashboard',
      icon: <Home className="size-4" />,
    },
    {
      label: 'Chats',
      href: '/chats',
    },
    {
      label: sessionLabel,
    },
  ];

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <HeaderBar
        items={breadcrumbs}
        actions={
          <>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-[var(--blue-separator)] bg-white"
              onClick={() =>
                clearChat.mutate({
                  params: { id: chatId },
                  body: { clear: true },
                })
              }
              isLoading={clearChat.isPending}
            >
              Clear chat
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <Link href="/chats" aria-label="Close chat">
                <X className="size-4" />
              </Link>
            </Button>
          </>
        }
      />

      <div className="min-h-0 flex-1 overflow-hidden p-4 md:p-6">
        <div className="mx-auto flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-[var(--blue-separator)] bg-white shadow-[0_24px_80px_-48px_rgba(32,54,86,0.35)]">
          <div className="border-b border-[var(--blue-separator)] bg-linear-to-r from-white via-[var(--blue-1)] to-[var(--blue-2)] px-6 py-5">
            <div className="flex items-start gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-[var(--blue-hover)] text-[var(--blue-9)]">
                <MessageCircle className="size-5" />
              </div>
              <div className="min-w-0 space-y-1">
                <h1 className="truncate text-xl font-semibold text-[var(--blue-12)]">
                  {sessionLabel}
                </h1>
                <p className="text-sm text-[var(--blue-dark-75)]">
                  {chat.summary?.trim()
                    ? 'Live streaming session'
                    : 'Open session'}
                  {' | '}
                  {getChatSessionMeta(chat.createdAt)}
                </p>
              </div>
            </div>
          </div>

          <div className="min-h-0 flex-1 bg-[linear-gradient(180deg,rgba(252,253,255,0.95)_0%,rgba(246,249,254,0.9)_100%)]">
            <ChatBox />
          </div>
        </div>
      </div>
    </div>
  );
}
