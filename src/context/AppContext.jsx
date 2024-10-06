/* eslint-disable camelcase */
import React, { createContext, useEffect, useState, useMemo, useCallback } from "react";
import { globalHistory } from "@reach/router";

export const AppContext = createContext({});

/** ============================================================================
 * @context
 * Global application data.
 */
const AppProvider = ({ children }) => {
  // ---------------------------------------------------------------------------
  // context / ref / state

  const [pathname, setPathname] = useState("");
  const [activeWindows, setActiveWindows] = useState([]);

  // ---------------------------------------------------------------------------
  // methods

  const toggleWindow = useCallback((windowName) => {
    setActiveWindows((prevActiveWindows) => {
      if (prevActiveWindows.includes(windowName)) {
        return prevActiveWindows.filter((win) => win !== windowName);
      } else {
        return [...prevActiveWindows, windowName];
      }
    });
  }, []);

  const isWindowActive = useCallback(
    (windowName) => activeWindows.includes(windowName),
    [activeWindows]
  );

  const closeAllWindows = useCallback(() => {
    setActiveWindows([]);
  }, []);

  // ---------------------------------------------------------------------------
  // lifecycle

  useEffect(() => {
    if (typeof window === `undefined` && !window?.location?.pathname) return;

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeAllWindows();
      }
    })

    setPathname(window.location.pathname);

    const unlisten = globalHistory.listen(({ location }) => {
      setPathname(location.pathname);
    });

    return () => {
      unlisten();
    };
  }, []);

  // ---------------------------------------------------------------------------
  // render

  const providerProps = useMemo(
    () => ({
      pathname,
      activeWindows,
      toggleWindow,
      isWindowActive,
      closeAllWindows
    }),
    [pathname, activeWindows, toggleWindow, isWindowActive, closeAllWindows]
  );

  return <AppContext.Provider value={providerProps}>{children}</AppContext.Provider>;
};

export default AppProvider;
