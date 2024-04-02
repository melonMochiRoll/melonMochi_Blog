import { useCallback, useState } from "react";

type TUseToggleReturnType = [
  boolean,
  () => void,
  React.Dispatch<React.SetStateAction<boolean>>,
];

const useToggle = (initData: boolean): TUseToggleReturnType => {
  const [ state, setState ] = useState(initData);

  const toggleState = useCallback(() => {
    setState(prev => !prev);
  }, [state]);

  return [ state, toggleState, setState ];
};

export default useToggle;