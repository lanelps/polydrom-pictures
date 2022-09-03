import React from "react";
import tw from "twin.macro";

import { Go } from "~components";

const Container = tw.button`relative w-max p-2 sm-t:p-3 bg-transparent hover:bg-offblack active:bg-transparent text-offblack hover:text-offwhite active:text-grey font-main text-m-b3 sm-t:text-d-b3 border hover:border-offblack active:border-grey rounded-[3.5rem] transition-colors`;

const Button = ({ children, className, to }) => {
  if (to) {
    return (
      <Go to={to}>
        <Container type="button" className={className}>
          {children}
        </Container>
      </Go>
    );
  }
  return (
    <Container type="button" className={className}>
      {children}
    </Container>
  );
};

export default Button;
