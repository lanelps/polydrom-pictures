/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { graphql } from "gatsby";

import { Layout, Nav, LandingMedia, Jobs, About, DVD } from "~components";

const Index = ({ data }) => {
  const {
    allSanityJob,
    sanityAbout,
    sanityContact,
    sanityGlobals,
    sanitySettings
  } = data;

  const jobs = allSanityJob?.edges?.map(({ node }) => node) || [];

  return (
    <Layout font={sanityGlobals?.font} footer={{ contact: sanityContact }}>
      <DVD dvd={sanityGlobals?.dvd} />
      <Nav title={sanitySettings?.seo?.title} />
      <LandingMedia media={sanityGlobals?.landingMedia} />
      <About body={sanityAbout?._rawBody} />
      <Jobs jobs={jobs} />
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
      <meta property="og:image" content={seo?.image?.asset?.url} />
      <meta property="og:url" content={seo?.domain} />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Google site verification */}
      <meta
        name="google-site-verification"
        content="Nj0RmwKjO-OtyJs2Ma_ayUUKviA8xFwiaIoPYzn1A34"
      />
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
              width: 1440
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
          altText
          mobileImage {
            asset {
              gatsbyImageData(
                width: 720
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
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
