import { graphql } from 'gatsby'

export const fragment = graphql`
  fragment prismicWorkFragment on PrismicWork {
    id
    uid
    url
    data {
      title {
        text
        html
      }
      featured_image {
        alt
        url
        fluid {
          ...GatsbyPrismicImageFluid
        }
      }
      description {
        html
        text
      }
      topofthepops
      images {
        image {
          alt
          url
          fluid {
            ...GatsbyPrismicImageFluid
          }
        }
      }
    }
  }
`
