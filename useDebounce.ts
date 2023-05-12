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

  useEffect(
    () => () => {
      debouncedFn.cancel();
    },
    [debouncedFn]
  );

  return debouncedFn;
}



// import { useEffect, useState } from 'react';

// function useDebounce<T>(value: T, delay?: number): T {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value);

//   useEffect(() => {
//     const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

// export { useDebounce };
