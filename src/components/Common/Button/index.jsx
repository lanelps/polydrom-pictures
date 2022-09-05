import React from "react";
import tw, { css, styled } from "twin.macro";

import { Go } from "~components";

const Container = styled.button(({ buttonType }) => [
  tw`relative w-max bg-transparent hover:bg-offblack active:bg-transparent text-offblack hover:text-offwhite active:text-grey font-main border hover:border-offblack active:border-grey rounded-[3.5rem] transition-colors`,
  buttonType === 2 && tw`p-2 sm-t:p-3 text-m-b3 sm-t:text-d-b3`,
  buttonType === 3 && tw`py-2 px-3 sm-t:px-4 text-m-h3 sm-t:text-d-h3`
]);

const Button = ({ children, className, to, type = 2 }) => {
  if (to) {
    return (
      <Go to={to}>
        <Container type="button" className={className} buttonType={type}>
          {children}
        </Container>
      </Go>
    );
  }
  return (
    <Container type="button" className={className} buttonType={type}>
      {children}
    </Container>
  );
};

export default Button;
