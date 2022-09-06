/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { graphql } from "gatsby";
import tw from "twin.macro";

import { Layout, Nav, LandingImage, Jobs, About, Contact } from "~components";

const Index = ({ data, location }) => {
  const {
    allSanityJob,
    sanityAbout,
    sanityContact,
    sanityGlobals,
    sanitySettings
  } = data;

  const jobs = allSanityJob?.edges.map(({ node }) => node);

  return (
    <Layout>
      <Nav navLinks={sanityGlobals?.navLinks} />
      <LandingImage image={sanityGlobals?.landingImage} />
      <Jobs jobs={jobs} />
      <About body={sanityAbout?._rawBody} />
      <Contact contact={sanityContact} />
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
      landingImage {
        asset {
          gatsbyImageData(
            width: 720
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
        altText
      }
      navLinks {
        _key
        title
        links {
          _key
          name
          url
        }
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
          _createdAt(fromNow: true)
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
