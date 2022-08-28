/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`
});

const path = require(`path`);

const {
  gatsby_executing_command: GATSBY_CMD,
  GATSBY_IS_PREVIEW,
  GATSBY_SITE_URL,
  HOST,
  IS_STAGING,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  SANITY_TOKEN
} = process.env;

const pathPrefix = ``;
const isDev =
  GATSBY_CMD === `develop` || process.env.NODE_ENV === `development`;
const isPreview = (IS_STAGING || `false`).toLocaleLowerCase() === `true`;
const previewEnabled = (GATSBY_IS_PREVIEW || `false`).toLowerCase() === `true`;

/** ----------------------------------------------------------------------------
 * Check all required ENV variables are set
 */
if (GATSBY_CMD !== `serve`) {
  const requiredEnvVariables = [
    `GATSBY_SITE_URL`,
    `SANITY_PROJECT_ID`,
    `SANITY_DATASET`
  ];

  requiredEnvVariables.map((item) => {
    if (!process.env[item]) {
      throw Error(`Set ${item} env variable. See README`);
    }
    return null;
  });
}

/** ----------------------------------------------------------------------------
 * SEO plugins
 */
const seoPlugins = () => {
  const plugins = [];

  plugins.push(`gatsby-plugin-react-helmet`);
  plugins.push({
    resolve: `gatsby-plugin-robots-txt`,
    options: {
      configFile: isPreview
        ? path.join(__dirname, `config/robots-txt.staging.js`)
        : path.join(__dirname, `config/robots-txt.production.js`)
    }
  });
  plugins.push({
    resolve: `gatsby-plugin-sitemap`,
    options: {
      excludes: [
        {
          policy: [
            {
              userAgent: `*`,
              allow: `/`,
              disallow: [``]
            }
          ]
        }
      ],
      query: `
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      siteBuildMetadata {
        buildTime(formatString: "YYYY-MM-DDTHH:mm:ss.sssZ")
      }
      allSitePage {
        nodes {
          path
        }
      }
      // allSanityPage {
      //   edges {
      //     node {
      //       _updatedAt(formatString: "YYYY-MM-DDTHH:mm:ss.sssZ")
      //       slug {
      //         current
      //       }
      //     }
      //   }
      // }
    }
    `,
      resolveSiteUrl: ({ site }) => site.siteMetadata.siteUrl,
      resolvePages: ({
        allSitePage: { nodes: sitePages },
        // allSanityPage: { edges: sanityPages },
        siteBuildMetadata
      }) =>
        sitePages.map((page) =>
          // const sanityPageIndex = sanityPages.findIndex(({ node }) => {
          //   const slug =
          //     node.slug.current === `/` ? `/` : `/${node.slug.current}/`;
          //   return page.path === slug;
          // });
          // return sanityPageIndex > -1
          //   ? {
          //       path: page.path,
          //       updatedAt: sanityPages[sanityPageIndex].node._updatedAt
          //     }
          //   : { path: page.path, updatedAt: siteBuildMetadata.buildTime };
          ({ path: page.path, updatedAt: siteBuildMetadata.buildTime })
        ),
      serialize: (page) => ({ url: page.path, lastmod: page.updatedAt }),
      createLinkInHead: true
    }
  });
  plugins.push({
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Sane Gatsby Tinderbox`,
      short_name: `SGT`,
      description: `A bare bones Sanity Gatsby boilerplate`,
      start_url: `/`,
      background_color: `#000000`,
      theme_color: `#000000`,
      display: `standalone`,
      icon: `static/favicon.jpg`,
      include_favicon: false,
      icon_options: {
        purpose: `any maskable`
      }
    }
  });
  // gatsby-plugin-offline to be after gatsby-plugin-manifest
  plugins.push({
    resolve: `gatsby-plugin-offline`
  });
  plugins.push(`gatsby-plugin-brotli`);

  return plugins;
};

/** ----------------------------------------------------------------------------
 * Tracking plugins
 */
const trackingPlugins = () => {
  const plugins = [];

  if (process.env.GA_ID) {
    plugins.push({
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_ID,
        head: true,
        anonymize: true
      }
    });
  }

  if (process.env.GTM_ID) {
    plugins.push({
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GTM_ID,
        includeInDevelopment: true,
        defaultDataLayer: () => {
          const queryStrings =
            (document && document.location && document.location.search) || {};

          window.utms = queryStrings;

          const queriesObj = queryStrings
            ? Object.fromEntries(new URLSearchParams(queryStrings))
            : {};

          return {
            platform: `gatsby`,
            ...queriesObj
          };
        }
      }
    });
  }

  return plugins;
};

/** ----------------------------------------------------------------------------
 * Hosting plugins
 */
const hostingPlugins = () => {
  const plugins = [];

  const securityHeaders = {
    "/*": [
      `X-Frame-Options: DENY`,
      `X-XSS-Protection: 1; mode=block`,
      `X-Content-Type-Options: nosniff`
    ]
  };

  switch (HOST) {
    case `gatsby-cloud`:
      plugins.push({
        resolve: `gatsby-plugin-gatsby-cloud`,
        options: {
          headers: securityHeaders,
          allPageHeaders: [],
          mergeSecurityHeaders: true,
          mergeLinkHeaders: true,
          mergeCachingHeaders: true
        }
      });

      break;

    case `netlify`:
      plugins.push({
        resolve: `gatsby-plugin-netlify`,
        options: {
          headers: securityHeaders,
          allPageHeaders: [],
          mergeSecurityHeaders: true,
          mergeLinkHeaders: true,
          mergeCachingHeaders: true
        }
      });

      break;

    default:
      break;
  }

  return plugins;
};

/** ----------------------------------------------------------------------------
 * Sanity plugins
 */
const sanityPlugins = () => {
  const plugins = [];

  if (
    !SANITY_PROJECT_ID ||
    SANITY_PROJECT_ID === `` ||
    !SANITY_DATASET ||
    SANITY_DATASET === ``
  ) {
    return plugins;
  }

  plugins.push({
    resolve: `gatsby-source-sanity`,
    options: {
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      token: SANITY_TOKEN,
      graphqlTag: `default`,
      watchMode: isDev,
      overlayDrafts: previewEnabled
    }
  });

  return plugins;
};

module.exports = {
  /* Your site config here */
  siteMetadata: {
    author: `Lane Le Prevost-Smith`,
    description: `A bare bones Sanity Gatsby boilerplate`,
    facebook: ``,
    instagram: ``,
    image: `/share.jpg`,
    keywords: ``,
    siteLanguage: `en`,
    siteUrl: GATSBY_SITE_URL + pathPrefix,
    title: `Sane Gatsby Tinderbox`,
    titleTemplate: `%s - Sane Gatsby Tinderbox`
  },
  trailingSlash: `always`,
  pathPrefix,
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `${__dirname}/static/favicon.jpg`
      }
    },
    ...seoPlugins(),
    ...trackingPlugins(),
    ...hostingPlugins(),
    ...sanityPlugins()
  ]
};
