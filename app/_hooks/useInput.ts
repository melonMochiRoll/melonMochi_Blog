import { Dispatch, SetStateAction, useCallback, useState } from "react";

type TuseInputReturnType<T> = [
  T,
  (e: any) => void,
  Dispatch<SetStateAction<T>>,
];

export default function useInput<T>(initData: T): TuseInputReturnType<T> {
  const [ value, setValue ] = useState(initData);

  const onChange = useCallback((e: any) => {
    setValue(e.target.value);
  }, [value]);

  return [ value, onChange, setValue ];
}