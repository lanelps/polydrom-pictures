import { useState, useLayoutEffect, useRef } from "react";
import useResizeObserver from "@react-hook/resize-observer";

const useSize = () => {
  const ref = useRef();
  const [size, setSize] = useState();

  useLayoutEffect(() => {
    setSize(ref.current.getBoundingClientRect());
  }, [ref]);

  // Where the magic happens
  useResizeObserver(ref, (entry) => setSize(entry.contentRect));
  return [ref, size];
};

export default useSize;
