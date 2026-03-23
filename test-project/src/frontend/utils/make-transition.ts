'use client';

import { flushSync } from 'react-dom';

interface ViewTransition {
  finished: Promise<void>;
  ready: Promise<void>;
  updateCallbackDone: Promise<void>;
}

declare global {
  interface Document {
    startViewTransition(callback: () => void | Promise<void>): ViewTransition;
  }
}

export function makeTransition(transition: () => void) {
  if (document.startViewTransition) {
    return document.startViewTransition(() => {
      flushSync(() => {
        transition();
      });
    });
  }

  return transition();
}
