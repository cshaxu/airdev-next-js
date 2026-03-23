'use client';

import { ChatMessageAttachmentType } from '@/common/types/data/chat-message';
import { Button } from '@/frontend/components/ui/Button';
import Textarea from '@/frontend/components/ui/Textarea';
import useGetBotMessageStream from '@/frontend/hooks/custom/get-bot-message-stream';
import { cn } from '@/frontend/lib/cn';
import {
  useChatMessageIsStreaming,
  useCurrentAttachments,
  useCurrentChatActions,
} from '@/frontend/stores/useCurrentChatStore';
import { ArrowUp } from 'lucide-react';
import { RefObject, useCallback, useEffect, useState } from 'react';

type Props = {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  className?: string;
  disabled?: boolean;
};

export default function ChatInput({
  textareaRef,
  className,
  disabled = false,
}: Props) {
  const [input, setInput] = useState('');
  const messageIsStreaming = useChatMessageIsStreaming();
  const currentAttachments = useCurrentAttachments();
  const { resetCurrentAttachments } = useCurrentChatActions();
  const { mutate: getBotMessageStream, isPending } = useGetBotMessageStream();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (messageIsStreaming || !input.trim()) {
      return;
    }
    e.preventDefault();
    getBotMessageStream({
      text: input,
      botChatMessageId: crypto.randomUUID(),
      onStreamBegin: () => setInput(''),
    });
    if (window.innerWidth < 640 && textareaRef.current) {
      textareaRef.current.blur();
    }
  };

  const handleSuggestedAnswerClick = (text: string) => {
    if (messageIsStreaming) {
      return;
    }
    getBotMessageStream({
      text,
      botChatMessageId: crypto.randomUUID(),
      onStreamBegin: () => setInput(''),
    });
    if (window.innerWidth < 640 && textareaRef.current) {
      textareaRef.current.blur();
    }
    resetCurrentAttachments();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isPending || messageIsStreaming) {
      return;
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();

      if (
        (e.metaKey || e.ctrlKey) &&
        e.target &&
        e.target instanceof HTMLTextAreaElement
      ) {
        const position = e.target.selectionStart;
        const newValue =
          input.slice(0, position) + '\n' + input.slice(position);
        setInput(newValue);
      } else {
        getBotMessageStream({
          text: input,
          botChatMessageId: crypto.randomUUID(),
          onStreamBegin: () => setInput(''),
        });
        if (window.innerWidth < 640 && textareaRef && textareaRef.current) {
          textareaRef.current.blur();
        }
      }
    }
  };

  const adjustHeight = useCallback(() => {
    if (textareaRef.current) {
      // Reset height to auto first to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      // Set the height to either scrollHeight or max height
      textareaRef.current.style.height = `${Math.min(scrollHeight, 400)}px`;
      textareaRef.current.style.overflow =
        scrollHeight > 400 ? 'auto' : 'hidden';
    }
  }, [textareaRef]);

  // Adjust height on input change
  useEffect(() => {
    adjustHeight();
  }, [input, adjustHeight]);

  // Set initial height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px'; // 11 units in Tailwind
    }
  }, [textareaRef]);

  return (
    <form onSubmit={handleSubmit} className={cn('p-4', className)}>
      <div
        className={cn(
          'bg-background flex w-full cursor-text flex-col rounded-3xl border px-3 py-1 shadow-[0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)] transition-colors contain-inline-size has-[:focus]:shadow-[0_2px_12px_0px_rgba(0,0,0,0.04),_0_9px_9px_0px_rgba(0,0,0,0.01),_0_2px_5px_0px_rgba(0,0,0,0.06)] dark:border-none dark:bg-[#303030] dark:shadow-none',
          disabled && 'bg-gray-200 dark:bg-gray-800'
        )}
      >
        {!!currentAttachments.length && (
          <div className="mt-2 mb-1 flex flex-row flex-wrap gap-2">
            {currentAttachments.map((attachment) => {
              if (
                attachment.type === ChatMessageAttachmentType.SUGGESTED_ANSWER
              ) {
                return (
                  <button
                    key={attachment.index}
                    className="cursor-pointer rounded-full border px-3 py-1 hover:ring-2"
                    type="button"
                    onClick={() => handleSuggestedAnswerClick(attachment.text)}
                  >
                    <span className="text-sm font-medium">
                      {attachment.text}
                    </span>
                  </button>
                );
              }

              if (attachment.type === ChatMessageAttachmentType.FILE) {
                return (
                  <div
                    key={attachment.id}
                    className="w-80 rounded-2xl border p-4"
                  >
                    <span className="truncate text-sm font-medium">
                      {attachment.originalName}
                    </span>
                  </div>
                );
              }

              return null;
            })}
          </div>
        )}

        <div className="flex items-start pl-1">
          <Textarea
            ref={textareaRef}
            className={cn(
              'min-h-[44px] resize-none border-none focus-visible:ring-0',
              disabled && 'bg-gray-200 dark:bg-gray-800'
            )}
            placeholder={disabled ? '' : 'Message Me'}
            value={input}
            rows={1}
            onChange={(e) => setInput(e.target.value)}
            disabled={isPending || messageIsStreaming || disabled}
            onKeyDown={handleKeyDown}
            spellCheck={true}
          />
        </div>

        <div className="mt-1 mb-2 flex items-center justify-end">
          {(input || !!currentAttachments.length) && (
            <Button
              type="submit"
              size="icon"
              className={cn('[&_svg]:size-5', disabled && 'opacity-70')}
              isLoading={isPending || messageIsStreaming}
              disabled={isPending || messageIsStreaming || disabled}
            >
              <ArrowUp />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
