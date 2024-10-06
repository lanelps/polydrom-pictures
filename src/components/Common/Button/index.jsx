import React from "react";
import tw, { css, styled } from "twin.macro";

import { Go } from "~components";

const Container = styled.button(({ buttonType }) => [
  tw`relative w-max p-1 sm-t:p-2 sm-t:pb-1.5 bg-transparent border border-offblack dark:(text-offwhite border-offwhite) disabled:border-grey disabled:text-grey disabled:pointer-events-none disabled:opacity-50 transition-colors`,
  buttonType === 1 &&
    tw`text-offblack hover:(bg-offblack text-offwhite) dark:hover:(bg-offwhite text-offblack border-offblack) active:(bg-transparent text-offblack/60 border-offblack/60) dark:active:(bg-transparent text-offwhite/60 border-offwhite/60)`,
  buttonType === 2 &&
    tw`text-offblack rounded-[3.5rem] uppercase hover:(bg-offblack text-offwhite border-offwhite)`
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
