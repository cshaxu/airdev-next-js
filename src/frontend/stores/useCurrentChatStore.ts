import {
  ChatMessageAttachment,
  ChatMessageAttachmentFile,
  ChatMessageAttachmentSuggestedAnswer,
  ChatMessageAttachmentType,
} from '@/common/types/data/chat-message';
import type { CommonChatMessageFieldRequest } from '@/frontend/types/data';
import type { SelectedChatMessageResponse } from '@/generated/types/chat-message';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const initialState = {
  chatId: undefined,
  chatMessages: undefined,
  chatMessageIsStreaming: false,
};

export type ChatSelectedChatMessage = SelectedChatMessageResponse<
  typeof CommonChatMessageFieldRequest
>;

interface CurrentChatState {
  chatId: string | undefined;
  chatMessages: ChatSelectedChatMessage[] | undefined;
  chatMessageIsStreaming: boolean;
  currentAttachments: ChatMessageAttachment[];
  actions: {
    setChatId: (_id: string) => void;
    setChatMessages: (_chatMessages: ChatSelectedChatMessage[]) => void;
    setChatMessageIsStreaming: (_chatMessageIsStreaming: boolean) => void;
    addChatMessage: (_chatMessage: ChatSelectedChatMessage) => void;
    removeChatMessage: (_chatMessageId: string) => void;
    updateChatMessage: (
      _chatMessageId: string,
      _updateFn: (
        _chatMessage: ChatSelectedChatMessage
      ) => ChatSelectedChatMessage
    ) => void;
    addCurrentAttachment: (_attachment: ChatMessageAttachment) => void;
    removeCurrentAttachment: (_attachment: ChatMessageAttachment) => void;
    resetCurrentAttachments: () => void;
    reset: () => void;
    clear: () => void;
  };
}

const useCurrentChatStore = create<CurrentChatState>()(
  devtools((set) => ({
    chatId: undefined,
    chatMessages: undefined,
    chatMessageIsStreaming: false,
    currentAttachments: [],
    actions: {
      setChatId: (chatId: string) => set({ chatId }),
      setChatMessages: (chatMessages: ChatSelectedChatMessage[]) => {
        const lastMessage = chatMessages[chatMessages.length - 1];
        set({
          chatMessages,
          currentAttachments:
            lastMessage?.userId === null ? lastMessage.attachments : [],
        });
      },
      setChatMessageIsStreaming: (chatMessageIsStreaming: boolean) =>
        set({ chatMessageIsStreaming }),
      addChatMessage: (chatMessage: ChatSelectedChatMessage) => {
        set((state) => ({
          chatMessages: [...(state.chatMessages ?? []), chatMessage],
        }));
      },
      removeChatMessage: (chatMessageId: string) =>
        set((state) => ({
          chatMessages: (state.chatMessages ?? []).filter(
            (m) => m.id !== chatMessageId
          ),
        })),
      updateChatMessage: (
        chatMessageId: string,
        updateFn: (_m: ChatSelectedChatMessage) => ChatSelectedChatMessage
      ) =>
        set((state) => ({
          chatMessages: (state.chatMessages ?? []).map((m) => {
            if (m.id === chatMessageId) {
              return updateFn(m);
            }
            return m;
          }),
        })),
      addCurrentAttachment: (attachment: ChatMessageAttachment) =>
        set((state) => ({
          currentAttachments: [...state.currentAttachments, attachment],
        })),
      removeCurrentAttachment: (attachment: ChatMessageAttachment) =>
        set((state) => ({
          currentAttachments: state.currentAttachments.filter((a) => {
            if (a.type === ChatMessageAttachmentType.FILE) {
              return a.id !== (attachment as ChatMessageAttachmentFile).id;
            } else if (a.type === ChatMessageAttachmentType.SUGGESTED_ANSWER) {
              return (
                a.index !==
                (attachment as ChatMessageAttachmentSuggestedAnswer).index
              );
            }
            return false;
          }),
        })),
      resetCurrentAttachments: () => set({ currentAttachments: [] }),
      reset: () => set(initialState),
      clear: () => set({ chatMessages: [], currentAttachments: [] }),
    },
  }))
);

export const useChatId = () => useCurrentChatStore((state) => state.chatId);
export const useChatMessages = () =>
  useCurrentChatStore((state) => state.chatMessages);
export const useChatMessageIsStreaming = () =>
  useCurrentChatStore((state) => state.chatMessageIsStreaming);
export const useCurrentAttachments = () =>
  useCurrentChatStore((state) => state.currentAttachments);
export const useCurrentChatActions = () =>
  useCurrentChatStore((state) => state.actions);
