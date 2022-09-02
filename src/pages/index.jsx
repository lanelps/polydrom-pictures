/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { graphql } from "gatsby";
import tw, { css, styled } from "twin.macro";

import { Layout, Image, Grid, Go } from "~components";

const Nav = tw.nav`absolute top-6 sm-t:top-4 w-full z-20`;
const NavLink = tw.li`relative w-full col-span-full sm-t:col-span-2 sm-d:col-span-1`;
const NavTitle = tw.h3`relative font-main text-m-h4 sm-t:text-d-h4 text-grey`;
const Links = tw.ul`relative w-full`;
const Link = tw.li`font-main font-main text-m-h4 sm-t:text-d-h4`;
const ImageWrapper = tw.div`relative w-full h-full col-span-full flex items-center justify-center`;
const Figure = tw.figure`relative sm-t:max-w-[70vw] sm-d:max-w-[50vw]`;

const Index = ({ data, location }) => {
  const {
    allSanityJob,
    sanityAbout,
    sanityContact,
    sanityGlobals,
    sanitySettings
  } = data;

  // console.log(`sanityGlobals`, sanityGlobals);

  return (
    <Layout>
      <Nav>
        <Grid node="ul">
          {sanityGlobals?.navLinks.map((navLink) => (
            <NavLink key={navLink?._key}>
              <NavTitle>{navLink?.title}</NavTitle>
              <Links>
                {navLink?.links.map((link) => (
                  <Link key={link?._key}>
                    <Go
                      to={link?.url}
                      css={[link?.url && tw`underline hover:no-underline`]}
                    >
                      {link?.name}
                    </Go>
                  </Link>
                ))}
              </Links>
            </NavLink>
          ))}
        </Grid>
      </Nav>
      <Grid css={[tw`h-full`]}>
        <ImageWrapper>
          <Figure>
            <Image image={sanityGlobals?.landingImage} css={[tw`w-full`]} />
          </Figure>
        </ImageWrapper>
      </Grid>
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
