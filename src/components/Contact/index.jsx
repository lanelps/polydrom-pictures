import React, { useEffect, useCallback, useRef } from "react";
import tw, { styled } from "twin.macro";

import { Grid, Button, ContactForm } from "~components";
import { useApp, useZIndex } from "~hooks";

const Container = styled.section(({ active }) => [
  tw`absolute top-0 left-0 right-0 z-30 translate-y-[-100%] pointer-events-none overflow-hidden transition-[opacity,transform]`,
  active && tw`translate-y-0`
]);
const EmailWrapper = styled.div(({ active }) => [
  tw`relative w-full pt-[3.375rem] pb-4 bg-lime dark:bg-red transition-colors pointer-events-none`,
  active && tw`pointer-events-auto`
]);
const LinksWrapper = tw.div`col-span-full flex flex-col sm-t:flex-row sm-t:items-center gap-x-2 gap-y-3 mt-4`;
const FormWrapper = styled.div(({ active }) => [
  tw`relative w-full pt-4 pb-8 sm-t:pb-16 bg-offblack/60 dark:bg-offwhite/60 backdrop-blur-[7px] border-b pointer-events-none`,
  active && tw`pointer-events-auto`
]);
const FormHeading = tw.h3`col-span-full font-main text-m-h3 sm-t:text-d-h3 text-offblack dark:text-offwhite`;

const Contact = ({ contact }) => {
  const { email, socialLinks, mailchimpID } = contact;

  const { isWindowActive, activeWindows } = useApp();
  const contactActive = isWindowActive("contact");

  const containerRef = useRef(null);

  const zIndex = useZIndex("contact");

  // Function to update z-index directly on the DOM element
  const updateZIndex = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.style.zIndex = zIndex;
    }
  }, [zIndex]);

  useEffect(() => {
    updateZIndex();
  }, [activeWindows, updateZIndex]);

  return (
    <Container ref={containerRef} active={contactActive}>
      <EmailWrapper active={contactActive}>
        <Grid css={[tw`gap-y-0 sm-t:gap-y-0`]}>
          <LinksWrapper>
            <div tw="flex items-center gap-x-2">
              <Button
                name="Email Us"
                kind={3}
                to={`mailto:${email}`}
                css={[
                  tw`text-m-h3 sm-t:text-d-h3 text-offblack dark:text-offwhite transition-colors`
                ]}
              >
                {email}
              </Button>
            </div>
          </LinksWrapper>
        </Grid>
      </EmailWrapper>

      <FormWrapper active={contactActive}>
        <Grid css={[tw`gap-y-0 sm-t:gap-y-0 mix-blend-difference`]}>
          <FormHeading>Mailing list</FormHeading>
          <ContactForm mailchimpID={mailchimpID} css={[tw`col-span-full`]} />
        </Grid>
      </FormWrapper>
    </Container>
  );
};

export default Contact;
