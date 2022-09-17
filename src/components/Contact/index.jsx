import React, { useState, useEffect } from "react";
import tw, { css, styled } from "twin.macro";

import { Grid, Button, SocialButton, ContactForm } from "~components";
import { useApp } from "~hooks";

const Container = styled.section(({ active, zIndex }) => [
  tw`absolute top-0 left-0 right-0 z-30 translate-y-[-100%] pointer-events-none overflow-hidden transition-[opacity,transform]`,
  active && tw`translate-y-0`,
  css`
    z-index: ${zIndex};
  `
]);
const EmailWrapper = styled.div(({ active }) => [
  tw`relative w-full pt-4 pb-8 sm-t:pb-16 bg-lime dark:bg-cobalt transition-colors pointer-events-none`,
  active && tw`pointer-events-auto`
]);
const EmailHeading = tw.h2`col-span-full text-m-h3 sm-t:text-d-h3 text-offblack dark:text-offwhite transition-colors`;
const LinksWrapper = tw.div`col-span-full flex flex-col sm-t:flex-row sm-t:items-center gap-x-2 gap-y-3 mt-4`;
const FormWrapper = styled.div(({ active }) => [
  tw`relative w-full pt-4 pb-8 sm-t:pb-16 bg-offwhite/60 backdrop-blur-[7px] border-b pointer-events-none`,
  active && tw`pointer-events-auto`
]);
const FormHeading = tw.h3`col-span-full text-m-h3 sm-t:text-d-h3`;

const Contact = ({ contact }) => {
  const { email, socialLinks, mailchimpID } = contact;

  const { contactActive, activeWindows } = useApp();

  const [zIndex, setZIndex] = useState();

  useEffect(() => {
    const windowIndex = activeWindows.findIndex((el) => el === `contact`);

    switch (windowIndex) {
      case 0:
        setZIndex(`30`);
        break;

      case 1:
        setZIndex(`40`);
        break;

      case 2:
        setZIndex(`50`);
        break;

      default:
        setZIndex(`auto`);
        break;
    }
  }, [activeWindows]);

  return (
    <Container active={contactActive} zIndex={zIndex}>
      <EmailWrapper active={contactActive}>
        <Grid css={[tw`gap-y-0 sm-t:gap-y-0`]}>
          <EmailHeading>General Enquiries:</EmailHeading>
          <LinksWrapper>
            <div tw="flex items-center gap-x-2">
              <Button
                kind={3}
                to={`mailto:${email}`}
                css={[tw`text-offblack dark:text-offwhite transition-colors`]}
              >
                Email Us
              </Button>
              {socialLinks?.length > 0 && (
                <p tw="text-m-h3 sm-t:text-d-h3 text-offblack dark:text-offwhite transition-colors">
                  or
                </p>
              )}
            </div>

            {socialLinks?.length > 0 && (
              <div tw="flex flex-wrap gap-x-2 gap-y-2">
                {socialLinks.map((socialLink) => (
                  <SocialButton
                    key={socialLink._key}
                    type={socialLink.type}
                    to={socialLink.url}
                  />
                ))}
              </div>
            )}
          </LinksWrapper>
        </Grid>
      </EmailWrapper>

      <FormWrapper active={contactActive}>
        <Grid css={[tw`gap-y-0 sm-t:gap-y-0`]}>
          <FormHeading>Join our mailing list</FormHeading>
          <ContactForm mailchimpID={mailchimpID} css={[tw`col-span-full`]} />
        </Grid>
      </FormWrapper>
    </Container>
  );
};

export default Contact;
