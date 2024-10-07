import React from "react";
import tw, { styled } from "twin.macro";

import { Grid, Button, ContactForm } from "~components";

const Container = styled.footer(() => [
  tw`fixed bottom-4 w-full z-50 mix-blend-difference opacity-0 animate-appear-up animation-delay-1000 text-offwhite`
]);
const Wrapper = tw.div`relative w-full col-span-full flex flex-col sm-t:flex-row gap-y-2 justify-between`;
const FormWrapper = tw.div`w-max flex items-center gap-x-2`;
const FormHeading = tw.h3`text-offwhite`;
const Enquiries = tw.div`flex items-center gap-x-3`;

const Footer = ({ footer: { contact } }) => {
  return (
    <Container>
      <Grid>
        <Wrapper>
          {contact?.mailchimpID && (
            <FormWrapper>
              <FormHeading className="b1-serif">Mailing list</FormHeading>
              <ContactForm mailchimpID={contact.mailchimpID} />
            </FormWrapper>
          )}

          {contact?.email && (
            <Enquiries>
              <h3 className="b1-serif" tw="text-offwhite">
                Enquiries
              </h3>
              <Button kind={2} to={`mailto:${contact.email}`} invert>
                {contact?.email}
              </Button>
            </Enquiries>
          )}
        </Wrapper>
      </Grid>
    </Container>
  );
};

export default Footer;
