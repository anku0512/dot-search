import { useEffect } from 'react';

export function useAbortableEffect(
  effect: (signal: AbortSignal) => void | (() => void),
  deps: unknown[]
) {
  useEffect(() => {
    const controller = new AbortController();
    const cleanup = effect(controller.signal);
    return () => {
      controller.abort();
      if (typeof cleanup === 'function') cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}


