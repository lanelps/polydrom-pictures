import React from "react";
import tw, { css, styled } from "twin.macro";

import { Go } from "~components";

const Container = styled.button(({ buttonType, disabled }) => [
  tw`relative w-max 
    bg-transparent hover:bg-offblack active:bg-transparent dark:hover:bg-offwhite dark:active:bg-transparent
    text-offblack hover:text-offwhite active:text-offblack/60 dark:text-offwhite dark:hover:text-offblack dark:active:text-offwhite/60
    border border-offblack hover:border-offwhite active:border-offblack/60 dark:border-offwhite dark:hover:border-offblack dark:active:border-offwhite/60
    disabled:border-grey disabled:text-grey 
    rounded-[3.5rem] transition-colors`,
  buttonType === 1 && tw`p-2`,
  buttonType === 2 && tw`p-1 sm-t:p-2`,
  buttonType === 3 && tw`py-2 px-3 sm-t:px-4`,
  disabled && tw`pointer-events-none`
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
