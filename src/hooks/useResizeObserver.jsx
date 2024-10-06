import { useEffect } from "react";

/**
 * Custom hook to observe size changes of a DOM element.
 *
 * @param {React.RefObject} ref - The ref of the DOM element to observe.
 * @param {Function} callback - The callback to execute on resize.
 */
const useResizeObserver = (ref, callback) => {
  useEffect(() => {
    if (!ref.current) return;

    // Ensure that ResizeObserver is supported
    if (typeof ResizeObserver === "undefined") {
      console.warn("ResizeObserver is not supported in your browser.");
      return;
    }

    // Create a new ResizeObserver instance
    const observer = new ResizeObserver((entries) => {
      if (!Array.isArray(entries)) return;
      if (!entries.length) return;

      // Execute the callback with the first entry
      callback(entries[0]);
    });

    // Start observing the element
    observer.observe(ref.current);

    // Cleanup function to disconnect the observer on unmount
    return () => {
      observer.disconnect();
    };
  }, [ref, callback]); // Re-run if ref or callback changes
};

export default useResizeObserver;
