import { OPENAI_API_KEY, OPENAI_CHAT_MODEL } from '@/backend/config';
import { createOpenAI } from '@ai-sdk/openai';
import {
  ModelMessage,
  Output,
  StreamTextOnFinishCallback,
  generateText as sdkGenerateText,
  streamText as sdkStreamText,
} from 'ai';
import OpenAI from 'openai';
import * as z from 'zod';

const openai = createOpenAI({ apiKey: OPENAI_API_KEY });

const openaiChatModel = openai(OPENAI_CHAT_MODEL);

type AiChatOptionsBase = {
  maxTokens?: number;
  temperature?: number;
  system?: string;
  onFinish?: StreamTextOnFinishCallback<{}>;
};

type AiChatPromptOptions = AiChatOptionsBase & {
  prompt: string;
  messages?: never;
};

type AiChatMessageOptions = AiChatOptionsBase & {
  prompt?: never;
  messages: ModelMessage[];
};

export type AiChatOptions = AiChatPromptOptions | AiChatMessageOptions;

function hasMessages(options: AiChatOptions): options is AiChatMessageOptions {
  return Array.isArray((options as AiChatMessageOptions).messages);
}

export function streamText(options: AiChatOptions): Response {
  const result = hasMessages(options)
    ? sdkStreamText({
        model: openaiChatModel,
        system: options.system,
        messages: options.messages,
        temperature: options.temperature,
        maxOutputTokens: options.maxTokens,
        onFinish: options.onFinish,
      })
    : sdkStreamText({
        model: openaiChatModel,
        system: options.system,
        prompt: options.prompt,
        temperature: options.temperature,
        maxOutputTokens: options.maxTokens,
        onFinish: options.onFinish,
      });

  result.consumeStream();
  return result.toTextStreamResponse();
}

export async function mockStreamText(
  text: string,
  onFinish?: (text: string) => PromiseLike<void> | void
): Promise<Response> {
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(new TextEncoder().encode(text));
      controller.close();
      await onFinish?.(text);
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}

export async function generateText(options: AiChatOptions): Promise<string> {
  const result = hasMessages(options)
    ? await sdkGenerateText({
        model: openaiChatModel,
        system: options.system,
        messages: options.messages,
        temperature: options.temperature,
        maxOutputTokens: options.maxTokens,
      })
    : await sdkGenerateText({
        model: openaiChatModel,
        system: options.system,
        prompt: options.prompt,
        temperature: options.temperature,
        maxOutputTokens: options.maxTokens,
      });

  return result.text;
}

export async function generateObject<T extends z.ZodTypeAny>(
  options: AiChatOptions & { schema: T }
): Promise<z.infer<T>> {
  const result = hasMessages(options)
    ? await sdkGenerateText({
        model: openaiChatModel,
        system: options.system,
        messages: options.messages,
        temperature: options.temperature,
        maxOutputTokens: options.maxTokens,
        output: Output.object({ schema: options.schema }),
      })
    : await sdkGenerateText({
        model: openaiChatModel,
        system: options.system,
        prompt: options.prompt,
        temperature: options.temperature,
        maxOutputTokens: options.maxTokens,
        output: Output.object({ schema: options.schema }),
      });

  return result.output as z.infer<T>;
}

export async function createJsonChatCompletion(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  model: string = OPENAI_CHAT_MODEL
): Promise<unknown> {
  const result = await sdkGenerateText({
    model: openai(model),
    temperature: 0,
    output: Output.json(),
    messages: messages as unknown as ModelMessage[],
  });

  return result.output;
}
