require('dotenv').config({
  path: `.env`,
})

const { htmlSerializer } = require('./src/prismic/htmlSerializer')

module.exports = {
  plugins: [
    `gatsby-plugin-sass`,
    'gatsby-plugin-postcss',
    `gatsby-plugin-typescript`,
    `gatsby-plugin-layout`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          '~': 'src',
        },
        extensions: [`ts`, `tsx`],
      },
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        accessToken: process.env.GATSBY_PRISMIC_ACCESS_TOKEN,
        linkResolver: ({ node, key, value }) => doc => {
          if (doc.type === 'page') {
            return `/${doc.id}`
          }
          return `/`
        },
        fetchLinks: [
          // Your list of links
        ],
        htmlSerializer: ({ node, key, value }) => (
          type,
          element,
          content,
          children
        ) => htmlSerializer(element, content),
        schemas: {
          frontpage: require(`./src/prismic/schemas/frontpage.json`),
          page: require(`./src/prismic/schemas/page.json`),
          work: require(`./src/prismic/schemas/work.json`),
        },
        lang: '*',
        prismicToolbar: true,
        shouldDownloadImage: ({ node, key, value }) => {
          // Return true to download the image or false to skip.
        },
      },
    },
  ],
}
