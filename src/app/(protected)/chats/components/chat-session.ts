export function getChatSessionLabel(
  chatId: string,
  createdAt?: Date,
  summary?: string | null
) {
  if (summary && summary.trim().length > 0) {
    return summary;
  }

  if (createdAt) {
    return `Session ${new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(createdAt)}`;
  }

  return `Session ${chatId.slice(0, 8)}`;
}

export function getChatSessionMeta(createdAt?: Date) {
  if (!createdAt) {
    return 'Open the session to start messaging.';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(createdAt);
}
