import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useIsMounted } from './useIsMounted';


export function useSafeState<S>(initialValue: (() => S) | S) {
  const [value, setValue] = useState(initialValue);

  const isMounted = useIsMounted();

  const setState = useCallback((newValue: React.SetStateAction<S>) => {
    if (!isMounted.current) {
      return;
    }
    setValue(newValue);
  }, []);

  return [value, setState] as const;
}
