import { cn } from '@/frontend/lib/cn';
import { GetManySelectedChatMessageResponse } from '@/generated/tanstack-hooks/chat-message-types';
import ReactMarkdown from 'react-markdown';

type ChatMessageListProps = {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  chatContainerRef: React.RefObject<HTMLUListElement | null>;
  handleScroll: () => void;
  chatMessages: GetManySelectedChatMessageResponse[];
  messagesEndRef: React.RefObject<HTMLLIElement | null>;
};

export default function ChatMessageList({
  scrollContainerRef,
  chatContainerRef,
  handleScroll,
  chatMessages,
  messagesEndRef,
}: ChatMessageListProps) {
  return (
    <div
      ref={scrollContainerRef}
      className={cn('min-h-0 flex-1 overflow-hidden')}
    >
      <ul
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto p-4"
      >
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={cn(
              'mb-4 flex',
              message.userId === null ? 'justify-start' : 'justify-end'
            )}
          >
            <div
              className={cn(
                'prose prose-neutral prose-sm dark:prose-invert prose-headings:font-medium prose-strong:font-medium max-w-[80%] rounded-3xl px-5 py-2.5 text-base/relaxed',
                message.userId === null
                  ? cn('bg-muted')
                  : cn('bg-primary text-primary-foreground')
              )}
            >
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        <li ref={messagesEndRef} />
      </ul>
    </div>
  );
}
