import React, { useState, useLayoutEffect, useEffect } from "react";
import tw, { css, styled } from "twin.macro";

import { ReactComponent as Dark } from "~assets/svg/dark.svg";
import { ReactComponent as Light } from "~assets/svg/light.svg";

const Container = tw.article`relative sm-t:absolute sm-t:right-4 w-max flex gap-x-[0.11rem] sm-t:gap-x-[0.1875rem] p-[0.125rem] sm-t:p-1 ml-3 sm-t:m-0 rounded bg-offblack dark:bg-offwhite transition-colors z-50`;
const ButtonWrapper = tw.button`relative w-[1.64rem] sm-t:w-10 h-[1.64rem] sm-t:h-10 flex items-center justify-center rounded`;

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState();

  useLayoutEffect(() => {
    if (typeof window === `undefined`) return;

    if (
      localStorage.theme === `dark` ||
      (!(`theme` in localStorage) &&
        window.matchMedia(`(prefers-color-scheme: dark)`).matches)
    ) {
      // document.documentElement.classList.add('dark')
      setIsDark(true);
    } else {
      // document.documentElement.classList.remove('dark')
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add(`dark`);
    } else {
      document.documentElement.classList.remove(`dark`);
    }
  }, [isDark]);

  return (
    <Container isDark={isDark}>
      <ButtonWrapper
        type="button"
        onClick={() => setIsDark(false)}
        css={[tw`bg-offwhite`]}
      >
        <Light css={[tw`w-5 h-5 sm-t:w-8 sm-t:h-8 text-offblack`]} />
      </ButtonWrapper>

      <ButtonWrapper
        type="button"
        onClick={() => setIsDark(true)}
        css={[tw`bg-offblack`]}
      >
        <Dark
          css={[
            tw`w-[0.423rem] sm-t:w-[0.625rem] h-[0.423rem] sm-t:h-[0.625rem] text-offwhite`
          ]}
        />
      </ButtonWrapper>
    </Container>
  );
};

export default ThemeToggle;
