import React, { useState } from "react";
import tw, { css, styled } from "twin.macro";

const Container = styled.form(({ disable }) => [
  tw`relative w-full mt-6 sm-t:mt-8 transition-opacity`,
  disable && tw`pointer-events-none opacity-50`
]);
const Input = tw.input`relative w-full text-m-h3 sm-t:text-d-h3 pb-2 sm-t:pb-4 bg-transparent border-b`;

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
        placeholder={
          submitted ? `We’ve sent you a confirmation email!` : `Email Address`
        }
        disabled={submitting || submitted}
      />
    </Container>
  );
};

export default ContactForm;
