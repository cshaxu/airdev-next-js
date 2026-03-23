'use client';

import { ChatMessageAttachmentType } from '@/common/types/data/chat-message';
import useHandleMutationError from '@/frontend/hooks/useHandleMutationError';
import { useCurrentUser } from '@/frontend/stores/currentUserStore';
import {
  useChatId,
  useCurrentAttachments,
  useCurrentChatActions,
} from '@/frontend/stores/useCurrentChatStore';
import { CommonChatMessageFieldRequest } from '@/frontend/types/data';
import { SelectedChatMessageResponse } from '@/generated/types/chat-message';
import { useCompletion } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';

export type GetBotMessageStreamParams = {
  text?: string;
  reviewContentNodeId?: string;
  botChatMessageId: string;
  onStreamBegin?: () => void;
  onStreamEnd?: () => void;
};

export default function useGetBotMessageStream() {
  const {
    addChatMessage,
    updateChatMessage,
    removeChatMessage,
    resetCurrentAttachments,
    setChatMessageIsStreaming,
  } = useCurrentChatActions();
  const handleMutationError = useHandleMutationError();

  const currentUser = useCurrentUser();
  const userId = currentUser?.id ?? '';
  const chatId = useChatId() ?? '';
  const currentAttachments = useCurrentAttachments();
  const activeStreamRef = useRef<{
    botChatMessageId: string;
    userChatMessageId?: string;
    onStreamEnd?: () => void;
  } | null>(null);

  const buildUserChatMessage = (text?: string) =>
    text === undefined
      ? undefined
      : {
          id: crypto.randomUUID(),
          createdAt: new Date(),
          userId,
          chatId,
          text: text ?? 'Please help me review my submission.',
          attachments: currentAttachments.map((attachment) =>
            attachment.type === ChatMessageAttachmentType.FILE
              ? { ...attachment, id: crypto.randomUUID() }
              : attachment
          ),
        };

  const completion = useCompletion({
    api: '/api/stream/get-bot-message-stream',
    credentials: 'include',
    streamProtocol: 'text',
    onFinish: (_prompt, finalText) => {
      const activeStream = activeStreamRef.current;
      if (activeStream === null) {
        return;
      }

      updateChatMessage(activeStream.botChatMessageId, (message) => ({
        ...message,
        text: finalText,
      }));
      activeStream.onStreamEnd?.();
      setChatMessageIsStreaming(false);
      activeStreamRef.current = null;
    },
    onError: (error) => {
      handleMutationError(error);

      const activeStream = activeStreamRef.current;
      if (activeStream !== null) {
        if (activeStream.userChatMessageId) {
          removeChatMessage(activeStream.userChatMessageId);
        }
        removeChatMessage(activeStream.botChatMessageId);
      }

      setChatMessageIsStreaming(false);
      activeStreamRef.current = null;
    },
  });

  useEffect(() => {
    const activeStream = activeStreamRef.current;
    if (activeStream === null || completion.completion.length === 0) {
      return;
    }

    updateChatMessage(activeStream.botChatMessageId, (message) => ({
      ...message,
      text: completion.completion,
    }));
  }, [completion.completion, updateChatMessage]);

  const mutate = async ({
    text,
    botChatMessageId,
    onStreamBegin,
    onStreamEnd,
  }: GetBotMessageStreamParams) => {
    const userChatMessage = buildUserChatMessage(text);
    if (userChatMessage) {
      addChatMessage(userChatMessage);
      resetCurrentAttachments();
    }

    const botChatMessage: SelectedChatMessageResponse<
      typeof CommonChatMessageFieldRequest
    > = {
      id: botChatMessageId,
      createdAt: new Date(),
      userId: null,
      chatId,
      text: 'Thinking ...',
      attachments: [],
    };
    addChatMessage(botChatMessage);
    setChatMessageIsStreaming(true);
    onStreamBegin?.();

    activeStreamRef.current = {
      botChatMessageId,
      userChatMessageId: userChatMessage?.id,
      onStreamEnd,
    };

    return completion.complete(text ?? '', {
      body: {
        chatId,
        botChatMessageId,
        ...(userChatMessage && {
          userChatMessageId: userChatMessage.id,
          userChatMessageAttachments: userChatMessage.attachments,
        }),
      },
    });
  };

  return {
    ...completion,
    mutate,
    isPending: completion.isLoading,
  };
}
