import React from "react";
import tw, { css, styled } from "twin.macro";
import { PortableText as BlockContent } from "@portabletext/react";

import { Go } from "~components";

const UnOrderedList = styled.ul`
  padding-left: 1.5ch;
  list-style: outside disc;

  p {
    display: inline;
  }
`;

const OrderedList = styled.ol`
  padding-left: 1.5ch;
  list-style: outside disc;

  p {
    display: inline;
  }
`;

const ListItem = styled.li`
  margin-bottom: 0.25rem;
`;

const serializers = {
  block: {
    normal: ({ children }) => <p className="b1-serif">{children}</p>,
    small: ({ children }) => (
      <>
        <br />
        <p className="b1-serif">{children}</p>
      </>
    )
  },
  marks: {
    strong: ({ children }) => (
      <strong className="b1-sans" tw="uppercase">
        {children}
      </strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    sup: ({ children }) => <sup>{children}</sup>,
    sub: ({ children }) => <sub>{children}</sub>,
    link: ({ children, mark }) => (
      <Go to={mark.href} newTab>
        {children}
      </Go>
    )
  },
  list: ({ type, children }) => {
    if (type === `bullet`) {
      return <UnOrderedList>{children}</UnOrderedList>;
    }
    return <OrderedList>{children}</OrderedList>;
  },
  listItem: ({ children }) => <ListItem>{children}</ListItem>
};

const PortableText = ({ className, blocks, serializer }) => {
  if (!blocks) {
    console.error(`Portable Text: Blocks is undefined`);
    return <></>;
  }

  return (
    <div className={className}>
      <BlockContent
        value={blocks}
        components={serializer || serializers}
        css={[
          css`
            & > * {
              margin-bottom: 1rem;
            }

            & > *:last-child {
              margin-bottom: 0;
            }
          `
        ]}
      />
    </div>
  );
};

export default PortableText;
