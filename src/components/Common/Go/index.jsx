import React, { useEffect, useState } from "react";
import { css } from "twin.macro";
import { Link } from "gatsby";

/**
 * -----------------------------------------------------------------------------
 * The component through which all links are be passed. Accepts a parameters
 * obj for appending attributes onto the resulting URL string.
 * @param  {props} props Noted in PropTypes below
 * @return {node}        The resulting link node with mutated URLs
 */
const Go = ({ children, className, debug, label, onClick, parameters, to }) => {
  const [parameterString, setParameterString] = useState(``);

  /**
   * ---------------------------------------------------------------------------
   * useEffect [parameters]
   * Set URL parameters based on object data from the calling component.
   */
  useEffect(() => {
    if (!parameters || !Object.keys(parameters)?.[0]) {
      return;
    }

    let newParameterString = ``;

    Object.keys(parameters).forEach((key) => {
      const parameter = parameters[key];

      if (!key || typeof key !== `string` || key === ``) {
        // eslint-disable-next-line no-console
        console.error(`[Go.jsx] Invalid key: ${key}`);
        return;
      }

      if (!parameter || typeof parameter !== `string` || parameter === ``) {
        // eslint-disable-next-line no-console
        console.error(`[Go.jsx] Invalid parameter: ${parameter}`);
        return;
      }

      newParameterString += `${
        newParameterString === `` ? `?` : `&`
      }${key}=${parameter}`;
    });

    setParameterString(newParameterString);
  }, [parameters]);

  /**
   * ---------------------------------------------------------------------------
   * useEffect [parameterString]
   * Debug the parameterString being set for any particular component instance.
   */
  useEffect(() => {
    if (debug) {
      // eslint-disable-next-line no-console
      console.log(`parameters: `, parameterString);
    }
  }, [parameterString]);

  //

  const href =
    to &&
    `${to.slice(-1) === `/` ? to : `${to}`}${
      parameterString !== `` ? parameterString : ``
    }`;

  if (!href) {
    return <span>{children}</span>;
  }

  if (
    href.includes(`http`) ||
    href.includes(`mailto`) ||
    href.includes(`tel`)
  ) {
    return (
      <a
        aria-label={label}
        href={href}
        className={className}
        css={css`
          display: inline-block;
        `}
        onClick={onClick}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      aria-label={label}
      to={href}
      className={className}
      css={css`
        display: inline-block;
      `}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Go;
