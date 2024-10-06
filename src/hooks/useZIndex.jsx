/* src/hooks/useZIndex.jsx */
import { useMemo } from "react";
import useApp from "./useApp";

const useZIndex = (windowName) => {
  const { activeWindows } = useApp();

  const zIndex = useMemo(() => {
    const windowIndex = activeWindows.findIndex((el) => el === windowName);
    switch (windowIndex) {
      case 0:
        return 30;
      case 1:
        return 40;
      case 2:
        return 50;
      default:
        return 10;
    }
  }, [activeWindows, windowName]);

  return zIndex;
};

export default useZIndex;