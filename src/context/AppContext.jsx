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

  // ---------------------------------------------------------------------------
  // render

  const providerProps = useMemo(() => ({
    pathname,
    aboutActive,
    setAboutActive,
    jobsActive,
    setJobsActive,
    contactActive,
    setContactActive
  }));

  return (
    <AppContext.Provider value={providerProps}>{children}</AppContext.Provider>
  );
};

export default AppProvider;
