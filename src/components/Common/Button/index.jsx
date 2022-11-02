import React from "react";
import tw, { css, styled } from "twin.macro";

import { Go } from "~components";

const Container = styled.button(({ buttonType, disabled }) => [
  tw`relative w-max bg-transparent hover:bg-offblack dark:hover:bg-offwhite active:bg-transparent text-offblack hover:text-offwhite dark:hover:text-offblack active:text-grey disabled:text-grey font-main border hover:border-offblack dark:hover:border-offwhite active:border-grey disabled:border-grey rounded-[3.5rem] transition-colors`,
  buttonType === 1 && tw`p-2 sm-t:p-3 text-m-b3 sm-t:text-d-b3`,
  buttonType === 2 && tw`p-1 sm-t:p-2 text-caption sm-t:text-m-b3`,
  buttonType === 3 && tw`py-2 px-3 sm-t:px-4 text-m-h3 sm-t:text-d-h3`,
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
          className={className}
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
      className={className}
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
