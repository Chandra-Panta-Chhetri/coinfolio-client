import { useEffect, useRef } from "react";

export const useRefAsState = (state) => {
  const ref = useRef(state);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return ref;
};
