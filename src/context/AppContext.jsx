/* eslint-disable camelcase */
import React, { createContext, useEffect, useState, useMemo } from "react";
import { globalHistory } from "@reach/router";

export const AppContext = createContext({});

/** ============================================================================
 * @context
 * Global application data.
 */
const AppProvider = ({ children }) => {
  // ---------------------------------------------------------------------------
  // context / ref / state

  const [pathname, setPathname] = useState(null);

  const [aboutActive, setAboutActive] = useState(false);
  const [jobsActive, setJobsActive] = useState(false);
  const [contactActive, setContactActive] = useState(false);

  const [activeWindows, setActiveWindows] = useState([]);

  // ---------------------------------------------------------------------------
  // methods

  // ...

  // ---------------------------------------------------------------------------
  // lifecycle

  useEffect(() => {
    if (typeof window !== `undefined` && window?.location?.pathname) {
      setPathname(window.location.pathname);
    }

    return globalHistory.listen(({ location }) => {
      setPathname(location.pathname);
    });
  }, []);

  useEffect(() => {
    if (aboutActive) {
      setActiveWindows((prev) => [...prev, `about`]);
    } else {
      const filteredWindows = activeWindows.filter((item) => item !== `about`);
      setActiveWindows(filteredWindows);
    }
  }, [aboutActive]);

  useEffect(() => {
    if (jobsActive) {
      setActiveWindows((prev) => [...prev, `jobs`]);
    } else {
      const filteredWindows = activeWindows.filter((item) => item !== `jobs`);
      setActiveWindows(filteredWindows);
    }
  }, [jobsActive]);

  useEffect(() => {
    if (contactActive) {
      setActiveWindows((prev) => [...prev, `contact`]);
    } else {
      const filteredWindows = activeWindows.filter(
        (item) => item !== `contact`
      );
      setActiveWindows(filteredWindows);
    }
  }, [contactActive]);

  // ---------------------------------------------------------------------------
  // render

  const providerProps = useMemo(() => ({
    pathname,
    aboutActive,
    setAboutActive,
    jobsActive,
    setJobsActive,
    contactActive,
    setContactActive,
    activeWindows,
    setActiveWindows
  }));

  return (
    <AppContext.Provider value={providerProps}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
