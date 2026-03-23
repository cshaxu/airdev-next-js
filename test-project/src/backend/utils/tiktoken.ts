import { MAX_CHAT_TOKEN_LIMIT, OPENAI_CHAT_MODEL } from '@/backend/config';
import {
  TiktokenModel,
  getEncoding,
  getEncodingNameForModel,
} from 'js-tiktoken';

export function countTokens(model: TiktokenModel, strings: string[]): number[] {
  const encoding = getEncodingNameForModel(model);
  const encoder = getEncoding(encoding);
  return strings.map((s) => encoder.encode(s)).map((a) => a.length);
}

export function getChatTokenLimit(strings: string[]): number {
  const tokenCounts = countTokens(OPENAI_CHAT_MODEL, strings);
  const totalTokenCount = tokenCounts.reduce((a, b) => a + b, 0);
  const tokenLimit = MAX_CHAT_TOKEN_LIMIT - totalTokenCount;
  return Math.min(MAX_CHAT_TOKEN_LIMIT / 2, tokenLimit);
}
