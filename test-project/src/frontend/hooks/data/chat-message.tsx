'use client';

import {
  useChatId,
  useCurrentChatActions,
} from '@/frontend/stores/useCurrentChatStore';
import { ChatMessageQueries } from '@/generated/tanstack-hooks/chat-message-client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function useGetManyChatMessages() {
  const chatId = useChatId();
  const { setChatMessages } = useCurrentChatActions();
  const query = useInfiniteQuery({
    ...ChatMessageQueries.getManyPageByCreatedAtDesc({ chatId: chatId! }),
    staleTime: 2 * 60 * 1000,
    enabled: !!chatId,
  });

  useEffect(() => {
    if (query.data?.pages) {
      const messages = query.data.pages
        .flatMap((p) => p?.chatMessages ?? [])
        .reverse();
      setChatMessages(messages);
    }
  }, [query.data, setChatMessages]);

  return query;
}
