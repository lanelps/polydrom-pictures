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

  plugins.push({
    resolve: `gatsby-plugin-robots-txt`,
    options: {
      host: GATSBY_SITE_URL + pathPrefix,
      sitemap: `${GATSBY_SITE_URL}/sitemap.xml`,
      policy: [{ userAgent: `*`, allow: `/` }]
    }
  });
  plugins.push({
    resolve: `gatsby-plugin-sitemap`,
    options: {
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
    }
    `,
      resolveSiteUrl: ({ site }) => site.siteMetadata.siteUrl,
      resolvePages: ({
        allSitePage: { nodes: sitePages },
        siteBuildMetadata
      }) =>
        sitePages.map((page) => ({
          path: page.path,
          updatedAt: siteBuildMetadata.buildTime
        })),
      serialize: (page) => ({ url: page.path, lastmod: page.updatedAt }),
      createLinkInHead: true
    }
  });
  plugins.push({
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Polydrom Pictures`,
      short_name: `Polydrom Pictures`,
      description: `Independant entertainment company that specializes in film and television production`,
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
      `Content-Security-Policy: frame-ancestors DENY`,
      `X-XSS-Protection: 1; mode=block`,
      `X-Content-Type-Options: nosniff`
    ]
  };

  plugins.push({
    resolve: `gatsby-plugin-netlify`,
    options: {
      headers: securityHeaders,
      allPageHeaders: [],
      mergeSecurityHeaders: true,
      mergeCachingHeaders: true
    }
  });

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
  flags: {
    DEV_SSR: true
  },
  siteMetadata: {
    author: `Lane Le Prevost-Smith`,
    description: ``,
    facebook: ``,
    instagram: ``,
    image: `/share.jpg`,
    keywords: ``,
    siteLanguage: `en`,
    siteUrl: GATSBY_SITE_URL + pathPrefix,
    title: `Polydrom Pictures`,
    titleTemplate: `%s - Polydrom Pictures`
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
    `gatsby-plugin-svgr`,
    ...seoPlugins(),
    ...trackingPlugins(),
    ...hostingPlugins(),
    ...sanityPlugins()
  ]
};
