import React from "react";
import tw, { css, styled } from "twin.macro";

import { Grid, Button, SocialButton, ContactForm } from "~components";
import { useApp } from "~hooks";

const Container = styled.section(({ active }) => [
  tw`absolute top-0 left-0 right-0 z-30 opacity-0 pointer-events-none overflow-hidden transition-opacity`,
  active && tw`opacity-100 pointer-events-auto`
]);
const EmailWrapper = tw.div`relative w-full pt-4 pb-8 sm-t:pb-16 bg-lime`;
const EmailHeading = tw.h2`col-span-full text-m-h3 sm-t:text-d-h3`;
const LinksWrapper = tw.div`col-span-full flex items-center gap-x-2 mt-4`;
const FormWrapper = tw.div`relative w-full pt-4 pb-8 sm-t:pb-16 bg-offwhite/60 backdrop-blur-[7px] border-b`;
const FormHeading = tw.h3`col-span-full text-m-h3 sm-t:text-d-h3`;

const Contact = ({ contact }) => {
  const { email, socialLinks, mailchimpID } = contact;

  const { contactActive } = useApp();

  return (
    <Container active={contactActive}>
      <EmailWrapper>
        <Grid css={[tw`gap-y-0 sm-t:gap-y-0`]}>
          <EmailHeading>General Enquiries:</EmailHeading>
          <LinksWrapper>
            <Button type={3} to={`mailto:${email}`}>
              Email Us
            </Button>

            {socialLinks?.length > 0 && (
              <>
                <p tw="text-m-h3 sm-t:text-d-h3">or</p>
                <div tw="flex flex-wrap gap-x-2 gap-y-2">
                  {socialLinks.map((socialLink) => (
                    <SocialButton
                      key={socialLink._key}
                      type={socialLink.type}
                      to={socialLink.url}
                    />
                  ))}
                </div>
              </>
            )}
          </LinksWrapper>
        </Grid>
      </EmailWrapper>

      <FormWrapper>
        <Grid css={[tw`gap-y-0 sm-t:gap-y-0`]}>
          <FormHeading>Join our mailing list</FormHeading>
          <ContactForm mailchimpID={mailchimpID} css={[tw`col-span-full`]} />
        </Grid>
      </FormWrapper>
    </Container>
  );
};

export default Contact;
