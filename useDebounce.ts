import { debounce } from "./useDebounceThrottle";
import { useEvent } from "./useEvent";
import { useEffect, useMemo } from "react";
export function useDebounce<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ms: number
) {
  const memoizedFn = useEvent(fn);

  const debouncedFn = useMemo(
    () =>
      debounce((...args: Parameters<Fn>) => {
        memoizedFn(...args);
      }, ms),
    [ms]
  );
//отмена при unmounted
  useEffect(
    () => () => {
      debouncedFn.cancel();
    },
    [debouncedFn]
  );

  return debouncedFn;
}


