//поменять стороки 35, 41,  48 если используется библиотека роутинга
import React, { useState } from "react";
import { isFunction } from "./utils/utils";
import { useEvent } from "./useEvent";

function getSearchParam(search: string, param: string) {
   const searchParams = new URLSearchParams(search);
   return searchParams.get(param);
}

function setSearchParam(search: string, param: string, value: string) {
   const searchParams = new URLSearchParams(search);
   searchParams.set(param, value);
   return searchParams.toString();
}

const defaultDeserialize = <Value,>(v: string | null) => v as Value;
const defaultSerialize = String;

interface UseSearchParamsStateOptions<Value> {
   name: string;
   serialize?: (value: Value) => string;
   deserialize?: (value: string | null) => Value;
}

function useSearchParamsState<Value>({
   name,
   serialize = defaultSerialize,
   deserialize = defaultDeserialize,
}: UseSearchParamsStateOptions<Value>) {
   const [value, setValue] = useState(() => {
      //поменять тут
      const initialValue = deserialize(getSearchParam(location.search, name));
      //нужно конвертировать вход и выход
      return initialValue;
   });

   const updateValue = useEvent((newValue: React.SetStateAction<Value>) => {
      const search = window.location.search;//поменять тут
      const actualNewValue = isFunction(newValue) ? newValue(value) : newValue;

      setValue(actualNewValue);

      const newSearch = setSearchParam(search, name, serialize(actualNewValue));

      history.pushState(null, "", `?${newSearch}`);//поменять тут
   });

   return [value, updateValue] as const;
}
export { useSearchParamsState };
