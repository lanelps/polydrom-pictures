import React from "react";
import tw, { css, styled } from "twin.macro";

import { Go } from "~components";

const Container = styled.button(({ buttonType, invert }) => [
  tw`relative w-max disabled:text-grey disabled:pointer-events-none disabled:opacity-50 transition-colors`,
  buttonType === 1 &&
    !invert &&
    tw`text-offwhite/60 hover:(text-offwhite) active:(text-offwhite)`,
  buttonType === 1 &&
    invert &&
    tw`text-white/60 hover:(text-offblack) active:(text-offwhite)`,
  buttonType === 2 &&
    !invert &&
    tw`py-1 px-2 sm-t:p-2 sm-t:pb-1.5 bg-transparent rounded-[3.5rem] uppercase text-offwhite border border-offwhite hover:(bg-offwhite text-offblack border-offblack) active:(bg-offwhite/60) disabled:border-grey`,
  buttonType === 2 &&
    invert &&
    tw`py-1 px-2 sm-t:p-2 sm-t:pb-1.5 bg-transparent rounded-[3.5rem] uppercase text-offwhite border border-offwhite hover:(bg-offwhite text-offblack border-offblack) active:(bg-offwhite/60) disabled:border-grey`
]);

const Button = ({
  children,
  className,
  disabled,
  name = ``,
  onClick,
  to,
  kind = 1,
  invert = false,
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
          invert={invert}
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
      invert={invert}
    >
      {children}
    </Container>
  );
};

export default Button;
