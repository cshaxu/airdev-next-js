'use client';

import useHandleMutationError from '@/frontend/hooks/useHandleMutationError';
import { useCompletion } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';

export type GetGenericStreamParams = {
  prompt: string;
  onStreamBegin?: () => void;
  onStreamEnd?: () => void;
  onStreamDone?: (text: string) => void;
  onStreamToken?: (partial: string) => void;
};

export default function useGetGenericStream() {
  const handleMutationError = useHandleMutationError();
  const activeStreamRef = useRef<{
    onStreamEnd?: () => void;
    onStreamDone?: (text: string) => void;
    onStreamToken?: (partial: string) => void;
  } | null>(null);
  const previousCompletionRef = useRef('');

  const completion = useCompletion({
    api: '/api/stream/generic-stream',
    credentials: 'include',
    streamProtocol: 'text',
    onFinish: (_prompt, finalText) => {
      activeStreamRef.current?.onStreamDone?.(finalText);
      activeStreamRef.current?.onStreamEnd?.();
      activeStreamRef.current = null;
      previousCompletionRef.current = '';
    },
    onError: (error) => {
      handleMutationError(error);
      activeStreamRef.current = null;
      previousCompletionRef.current = '';
    },
  });

  useEffect(() => {
    const activeStream = activeStreamRef.current;
    if (activeStream === null) {
      return;
    }

    const delta = completion.completion.slice(
      previousCompletionRef.current.length
    );
    if (!delta) {
      return;
    }

    previousCompletionRef.current = completion.completion;
    activeStream.onStreamToken?.(delta);
  }, [completion.completion]);

  const mutate = async ({
    prompt,
    onStreamBegin,
    onStreamEnd,
    onStreamDone,
    onStreamToken,
  }: GetGenericStreamParams) => {
    activeStreamRef.current = { onStreamEnd, onStreamDone, onStreamToken };
    previousCompletionRef.current = '';
    onStreamBegin?.();

    return (
      (await completion.complete(prompt, {
        body: { prompt },
      })) ?? ''
    );
  };

  return {
    ...completion,
    mutate,
    isPending: completion.isLoading,
  };
}
