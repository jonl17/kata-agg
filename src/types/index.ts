import { FluidObject } from 'gatsby-image'

export type Image = { alt: string; url: string; fluid: FluidObject }

interface PrismicWorkQuery {
  document: {
    id: string
    uid: string
    url: string
    data: {
      title: {
        text: string
        html: string
      }
      featured_image: Image
      content: {
        html: string
        text: string
      }
      year: number
      topofthepops: boolean
      images: {
        image: Image
      }[]
      size: 'small' | 'medium' | 'large'
    }
  }
}

export interface PrismicFrontpageQuery {
  data: {
    works: {
      work: PrismicWorkQuery
    }[]
  }
}

export interface Work {
  url: string
  uid: string
  title: {
    text: string
    html: string
  }
  featured_image: Image
  content: {
    html: string
    text: string
  }
  year: number
  topofthepops: boolean
  images: {
    image: Image
  }[]
  size: 'small' | 'medium' | 'large'
}
