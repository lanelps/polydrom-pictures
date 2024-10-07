import React, { useState } from "react";
import tw, { styled } from "twin.macro";

import { Button } from "~components";

const Container = styled.form(({ disable }) => [
  tw`relative transition-opacity flex items-center gap-x-2`,
  disable && tw`pointer-events-none opacity-50`
]);
const Input = tw.input`bg-transparent mt-[1px] w-[12ch] text-offwhite placeholder:text-offwhite/60`;

const ContactForm = ({ className, mailchimpID }) => {
  const [email, setEmail] = useState(``);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`/api/mailChimp`, {
        method: `POST`,
        body: JSON.stringify({ email, listID: mailchimpID })
      });

      const response = await res.json();

      if (response.body.status === `failed`)
        throw new Error(response.body.message);

      setSubmitting(false);
      setEmail(``);
      setSubmitted(true);

      await setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      setEmail(``);
      setSubmitted(false);
    }
  };

  return (
    <Container
      className={className}
      onSubmit={handleSubmit}
      disable={submitting}
    >
      <Input
        required
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
        placeholder="Email Address"
        disabled={submitting || submitted}
        className="b1-sans"
      />

      <Button kind={2} type="submit" disabled={submitting || submitted} invert>
        {submitted ? "SUCCESS" : "SUBMIT"}
      </Button>
    </Container>
  );
};

export default ContactForm;
