/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { graphql } from "gatsby";
import tw from "twin.macro";

import {
  Layout,
  Nav,
  LandingMedia,
  Jobs,
  About,
  Contact,
  DVD
} from "~components";

const Index = ({ data, location }) => {
  const { allSanityJob, sanityAbout, sanityContact, sanityGlobals } = data;

  const jobs = allSanityJob?.edges.map(({ node }) => node);

  return (
    <Layout font={sanityGlobals?.font} footer={sanityGlobals?.footer}>
      <DVD dvd={sanityGlobals?.dvd} />
      <Nav navLinks={sanityGlobals?.navLinks} />
      <LandingMedia media={sanityGlobals?.landingMedia} />
      <About body={sanityAbout?._rawBody} />
      <Jobs jobs={jobs} />
      <Contact contact={sanityContact} />
    </Layout>
  );
};

export default Index;

export const Head = ({ data }) => {
  const {
    sanitySettings: { seo }
  } = data;

  return (
    <>
      <title>{seo?.title}</title>
      <meta name="description" content={seo?.description} />
      <meta name="keywords" content={seo?.keywords} />
      <link
        rel="icon"
        type={seo?.favicon?.asset?.mimeType}
        href={seo?.favicon?.asset?.url}
      />

      {/* open graph/ twitter */}
      <meta property="og:title" content={seo?.title} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={seo?.description} />
      <meta property="og:image" content={seo.image.asset.url} />
      <meta property="og:url" content={seo.domain} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
};

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
            url
          }
          altText
        }
        linkText
        linkUrl
      }
      landingMedia {
        type
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
        video {
          source {
            format
            public_id
          }
          safariSource {
            format
            public_id
          }
        }
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
      footer {
        title
      }
      font {
        asset {
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
          _createdAt
          _key
          title
          timeline
          location
          pay
          description
          jobFile {
            asset {
              url
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
        domain
        keywords
        image {
          asset {
            url
          }
        }
        favicon {
          asset {
            mimeType
            url
          }
        }
      }
    }
  }
`;
