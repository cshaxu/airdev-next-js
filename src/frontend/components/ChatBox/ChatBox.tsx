'use client';

import useGetBotMessageStream from '@/frontend/hooks/custom/get-bot-message-stream';
import useGetManyChatMessages from '@/frontend/hooks/data/chat-message';
import { cn } from '@/frontend/lib/cn';
import { useCurrentUser } from '@/frontend/stores/currentUserStore';
import {
  useChatId,
  useChatMessageIsStreaming,
  useChatMessages,
} from '@/frontend/stores/useCurrentChatStore';
import { throttle } from '@/frontend/utils/scroll';
import { Loader2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import ChatMessageList from './ChatMessageList';

type Props = { autoFirstMessage?: boolean; disabled?: boolean };

export default function ChatBox({
  autoFirstMessage = false,
  disabled = false,
}: Props) {
  // states
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);

  // refs
  const messagesEndRef = useRef<HTMLLIElement>(null);
  const chatContainerRef = useRef<HTMLUListElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // hooks
  const chatMessages = useChatMessages();
  const chatId = useChatId();
  const currentUser = useCurrentUser();
  const messageIsStreaming = useChatMessageIsStreaming();
  const { status } = useGetManyChatMessages();
  const { mutate: getBotMessageStream } = useGetBotMessageStream();

  // 当messages为空且状态已加载完成时，自动发送空白消息
  useEffect(() => {
    if (
      autoFirstMessage &&
      status === 'success' &&
      chatMessages?.length === 0 &&
      !disabled &&
      !messageIsStreaming &&
      chatId &&
      currentUser?.id
    ) {
      getBotMessageStream({ botChatMessageId: crypto.randomUUID() });
    }
  }, [
    autoFirstMessage,
    status,
    chatMessages,
    disabled,
    messageIsStreaming,
    chatId,
    currentUser?.id,
    getBotMessageStream,
  ]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const bottomTolerance = 30;

      if (scrollTop + clientHeight < scrollHeight - bottomTolerance) {
        setAutoScrollEnabled(false);
      } else {
        setAutoScrollEnabled(true);
      }
    }
  };

  const scrollDown = () => {
    if (autoScrollEnabled) {
      messagesEndRef.current?.scrollIntoView(true);
    }
  };
  const throttledScrollDown = throttle(scrollDown, 250);

  useEffect(() => {
    throttledScrollDown();
  }, [throttledScrollDown]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAutoScrollEnabled(entry.isIntersecting);
        if (entry.isIntersecting) {
          textareaRef.current?.focus();
        }
      },
      {
        root: null,
        threshold: 0.5,
      }
    );
    const messagesEndElement = messagesEndRef.current;
    if (messagesEndElement) {
      observer.observe(messagesEndElement);
    }
    return () => {
      if (messagesEndElement) {
        observer.unobserve(messagesEndElement);
      }
    };
  }, [messagesEndRef]);

  if (status === 'pending') {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="size-4 animate-spin" />
      </div>
    );
  }

  if (status === 'error') {
    return null;
  }

  const isDisabled = disabled;

  return (
    <div
      className={cn(
        'relative flex h-full flex-col',
        isDisabled && 'opacity-80'
      )}
    >
      <ChatMessageList
        scrollContainerRef={scrollContainerRef}
        chatContainerRef={chatContainerRef}
        handleScroll={handleScroll}
        chatMessages={chatMessages ?? []}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput textareaRef={textareaRef} disabled={isDisabled} />
    </div>
  );
}
