import { useState, useEffect, useRef } from "react";
import useResizeObserver from "./useResizeObserver"; // Adjust the path as needed

/**
 * Custom hook to get the size of a DOM element.
 *
 * @returns {[React.RefObject, DOMRectReadOnly | undefined]} - The ref and the size.
 */
const useSize = () => {
  const ref = useRef(null);
  const [size, setSize] = useState();

  // Set initial size
  useEffect(() => {
    if (ref.current) {
      setSize(ref.current.getBoundingClientRect());
    }
  }, [ref]);

  // Update size on resize
  useResizeObserver(ref, (entry) => {
    setSize(entry.contentRect);
  });

  return [ref, size];
};

export default useSize;
