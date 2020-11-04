import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Footer from '~/components/Footer'
import { WorkContext } from '~/context/workContext'
import Close from '~/components/Close'
import styles from './Work.module.scss'

interface Props {
  data: {
    prismicWork: {
      data: {
        title: {
          text: string
        }
        description: {
          html: string
        }
        images: {
          image: { url: string; alt: string }
        }[]
      }
    }
  }
}

const ImageGallery = ({
  gallery,
}: {
  gallery: { url: string; alt: string }[]
}) => {
  const [imageIdx, setImageIdx] = useState(0)
  const lastInLine = imageIdx !== gallery.length - 1
  return (
    <img
      onClick={() =>
        lastInLine
          ? setImageIdx((prevIdx: number) => prevIdx + 1)
          : setImageIdx(0)
      }
      src={gallery[imageIdx].url}
    />
  )
}

const Work = ({ data }: Props) => {
  const { description, images } = data.prismicWork.data
  return (
    <>
      <div className='container d-flex'>
        <div className={styles.imageContainer}>
          <ImageGallery
            gallery={images.map(item => {
              return { url: item.image.url, alt: item.image.alt }
            })}
          />
        </div>
        <Close />
      </div>
      <Footer
        workDetails={
          <div dangerouslySetInnerHTML={{ __html: description.html }} />
        }
      />
    </>
  )
}

export const query = graphql`
  query($id: String!) {
    prismicWork(id: { eq: $id }) {
      data {
        title {
          text
        }
        description {
          html
        }
        images {
          image {
            url
            alt
          }
        }
      }
    }
  }
`

export default Work
