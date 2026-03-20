import {
  OPENAI_API_KEY,
  OPENAI_AUDIO_JUDGE_MODEL,
  OPENAI_CHAT_MODEL,
  OPENAI_TRANSCRIBE_MODEL,
} from '@/backend/config';
import { buildMissingErrorMessage } from '@airent/api';
import createHttpError from 'http-errors';
import OpenAI, { toFile } from 'openai';

const OPENAI_CHAT_COMPLETIONS_URL =
  'https://api.openai.com/v1/chat/completions';
const MAX_AUDIO_JUDGE_RETRIES = 2;

function extensionFromMimeType(mimeType: string | undefined): string {
  const normalized = (mimeType ?? '').toLowerCase();
  if (normalized.includes('webm')) {
    return 'webm';
  }
  if (normalized.includes('wav')) {
    return 'wav';
  }
  if (normalized.includes('mpeg') || normalized.includes('mp3')) {
    return 'mp3';
  }
  if (normalized.includes('ogg')) {
    return 'ogg';
  }
  if (normalized.includes('mp4')) {
    return 'mp4';
  }
  return 'wav';
}

export async function transcribe(params: {
  audio: Buffer;
  mimeType?: string;
  prompt?: string;
  language?: string;
}): Promise<string> {
  const { audio, mimeType, prompt, language } = params;
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  if (!openai) {
    throw createHttpError.InternalServerError(
      buildMissingErrorMessage('openai')
    );
  }

  const extension = extensionFromMimeType(mimeType);
  const file = await toFile(audio, `${crypto.randomUUID()}.${extension}`);
  const { text } = await openai.audio.transcriptions.create({
    file,
    model: OPENAI_TRANSCRIBE_MODEL,
    language,
    prompt,
    temperature: 0,
  });
  return text;
}

export async function createJsonChatCompletion(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  model: string = OPENAI_CHAT_MODEL
): Promise<unknown> {
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  const completion = await openai.chat.completions.create({
    model,
    temperature: 0,
    response_format: { type: 'json_object' },
    messages,
  });
  const content = completion.choices[0]?.message?.content ?? '{}';
  return JSON.parse(content);
}

export async function createJsonChatCompletionWithInputAudio(params: {
  prompt: string;
  audioBase64: string;
  audioFormat: 'wav' | 'mp3';
  model?: string;
}): Promise<unknown> {
  const {
    prompt,
    audioBase64,
    audioFormat,
    model = OPENAI_AUDIO_JUDGE_MODEL,
  } = params;
  const body = {
    model,
    temperature: 0,
    messages: [
      {
        role: 'system',
        content:
          'Return strict JSON object only. No markdown, no backticks, no prose.',
      },
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          {
            type: 'input_audio',
            input_audio: { data: audioBase64, format: audioFormat },
          },
        ],
      },
    ],
  };

  const payload = await postChatCompletionsWithRetry(body);
  const content = payload?.choices?.[0]?.message?.content ?? '{}';
  return parseJsonFromModelContent(content);
}

type ChatCompletionsResponse = {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message?: string; type?: string };
};

type FailedChatCompletionsResponse = {
  status: number;
  message: string;
};

function shouldRetry(status: number): boolean {
  return status === 429 || status >= 500;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function postChatCompletionsWithRetry(
  body: unknown
): Promise<ChatCompletionsResponse> {
  const result = await postChatCompletionsAttempt(body, 0);
  if (!('status' in result)) {
    return result;
  }
  if (result.status === 429) {
    throw createHttpError(429, result.message);
  }
  if (result.status >= 500) {
    throw createHttpError(502, `OpenAI upstream error: ${result.message}`);
  }
  throw createHttpError.BadRequest(result.message);
}

async function postChatCompletionsAttempt(
  body: unknown,
  attempt: number
): Promise<ChatCompletionsResponse | FailedChatCompletionsResponse> {
  const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const payload = (await response.json()) as ChatCompletionsResponse;
  if (response.ok) {
    return payload;
  }

  const failure = {
    status: response.status,
    message: payload?.error?.message ?? 'OpenAI error',
  };
  if (!shouldRetry(response.status) || attempt >= MAX_AUDIO_JUDGE_RETRIES) {
    return failure;
  }

  const jitterMs = Math.floor(Math.random() * 200);
  await sleep(250 * (attempt + 1) + jitterMs);
  return postChatCompletionsAttempt(body, attempt + 1);
}

function parseJsonFromModelContent(content: string): unknown {
  try {
    return JSON.parse(content);
  } catch {
    const cleaned = content
      .replace(/^```(?:json)?/i, '')
      .replace(/```$/i, '')
      .trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      const start = cleaned.indexOf('{');
      const end = cleaned.lastIndexOf('}');
      if (start >= 0 && end > start) {
        return JSON.parse(cleaned.slice(start, end + 1));
      }
      throw createHttpError.BadRequest(
        'Invalid JSON returned by OpenAI audio judge'
      );
    }
  }
}
