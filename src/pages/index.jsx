import React from "react";
import { graphql } from "gatsby";
import tw, { css, styled } from "twin.macro";

import { Layout, Image } from "~components";

import tinderbox from "~assets/images/300px-Firemaking.gif";

const Index = ({ data, location }) => {
  const {
    allSanityJob,
    sanityAbout,
    sanityContact,
    sanityGlobals,
    sanitySettings
  } = data;

  return (
    <Layout>
      <div />
    </Layout>
  );
};

export default Index;

export const query = graphql`
  query PolydromPictures {
    # Globals
    sanityGlobals {
      dvd {
        image {
          asset {
            gatsbyImageData(
              width: 720
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
          altText
        }
        linkText
        linkUrl
      }
    }
    # About
    sanityAbout {
      _rawBody
    }
    # Jobs
    allSanityJob {
      edges {
        node {
          _key
          title
          timeline
          location
          pay
          description
          jobFile {
            asset {
              source {
                url
              }
            }
          }
        }
      }
    }
    # Contact
    sanityContact {
      email
      socialLinks {
        _key
        type
        url
      }
      mailchimpID
    }
    # Settings
    sanitySettings {
      seo {
        title
        description
        keywords
        image {
          asset {
            gatsbyImageData(
              width: 720
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`;
