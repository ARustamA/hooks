import { rafThrottle } from "./useDebounceThrottle";
import { useEvent } from "./useEvent";
import { useEffect, useMemo } from "react";

export function useRafThrottle<Fn extends (...args: any[]) => any>(fn: Fn) {
   const memoizedFn = useEvent(fn);
 
   const throttledFn = useMemo(
     () =>
       rafThrottle((...args: Parameters<Fn>) => {
         memoizedFn(...args);
       }),
     []
   );
 
   useEffect(
     () => () => {
       throttledFn.cancel();
     },
     [throttledFn]
   );
 
   return throttledFn;
 }