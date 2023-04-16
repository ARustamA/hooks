import React, { useState } from "react";

import { isFunction } from "./utils/utils";

import { useEvent } from "./useEvent";
import { PersistentStorage, localStorageWrapper, sessionStorageWrapper } from "./localSessionStorageWrapper";

function createPersistentStateHooks(storage: PersistentStorage) {
   return function usePersistentState<Value>(
      name: string,
      initialValue: (() => Value) | Value
   ) {
      const [value, setValue] = useState(() => {
         if (storage.has(name)) {
            return storage.get(name) as Value;
         }

         return isFunction(initialValue) ? initialValue() : initialValue;
      });

      const setState = useEvent((newValue: React.SetStateAction<Value>) => {
         const actualNewValue = isFunction(newValue) ? newValue(value) : newValue;

         storage.set(name, actualNewValue);

         setValue(actualNewValue);
      });

      return [value, setState] as const;
   };
}

export const useLocalStorageA = createPersistentStateHooks(localStorageWrapper);
export const useSessionStorageA = createPersistentStateHooks(sessionStorageWrapper);