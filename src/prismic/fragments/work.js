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
      }
      content {
        html
        text
      }
      year
      focus
      images {
        image {
          alt
          url
        }
      }
    }
  }
`
