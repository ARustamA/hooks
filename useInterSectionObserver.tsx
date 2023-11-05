import { useCallback, useRef } from 'react';
import type { DependencyList } from 'react';

export function useInterSectionObserver<T extends Element>(
  callback: () => void,
  deps: DependencyList
) {
  const observer = useRef<IntersectionObserver | null>(null);
  const ref = useCallback(
    (node: T | null) => {
      if (node && deps.every(Boolean)) {
        observer.current?.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) callback();
        });

        observer.current.observe(node);
      }
    },
    [deps, callback]
  );

  return ref;
}
