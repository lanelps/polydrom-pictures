/* eslint-disable import/prefer-default-export */
import { theme } from "twin.macro";

export const breakpoint = (key, bound = `min`) => {
  const screens = theme`screens`;

  if (!screens?.[key]) {
    return `@media `;
  }

  return `@media only screen and (${bound}-width: ${screens[key]}) `;
};

export const getColor = (color) => {
  if (color?.charAt(0) === `#`) {
    return color;
  }

  return theme`colors`[color] || null;
};
