import React from "react";
import tw, { css, styled } from "twin.macro";

import { Go } from "~components";

const Container = styled.button(({ buttonType }) => [
  tw`relative w-max disabled:text-grey disabled:pointer-events-none disabled:opacity-50 transition-colors`,
  buttonType === 1 &&
    tw`text-offblack/60 dark:(text-offwhite/60) hover:(text-offwhite) dark:hover:(text-offwhite) active:(text-offblack) dark:active:(text-offwhite)`,
  buttonType === 2 &&
    tw`p-1 pt-1.5 sm-t:pt-2 sm-t:p-2 sm-t:pb-1.5 bg-transparent rounded-[3.5rem] uppercase text-offblack border border-offblack dark:(text-offwhite border-offwhite) hover:(bg-offblack text-offwhite border-offwhite) dark:hover:(bg-offwhite text-offblack border-offblack) active:(bg-offblack/60) dark:active:(bg-offwhite/60) disabled:border-grey`
]);

const Button = ({
  children,
  className,
  disabled,
  name = ``,
  onClick,
  to,
  kind = 1,
  type = `button`
}) => {
  if (to) {
    return (
      <Go to={to}>
        <Container
          type={type}
          className={className ? `${className} button` : `button`}
          buttonType={kind}
          aria-label={name}
          onClick={onClick}
          disabled={disabled ? `true` : ``}
        >
          {children}
        </Container>
      </Go>
    );
  }
  return (
    <Container
      type={type}
      className={className ? `${className} button` : `button`}
      buttonType={kind}
      aria-label={name}
      onClick={onClick}
      disabled={disabled ? `true` : ``}
    >
      {children}
    </Container>
  );
};

export default Button;
