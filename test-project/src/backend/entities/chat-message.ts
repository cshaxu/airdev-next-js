import { ChatMessageEntityBase } from '@/generated/entities/chat-message';

export class ChatMessageEntity extends ChatMessageEntityBase {
  public getText = (): string =>
    'text' in this.content ? (this.content.text ?? '') : '';
}
