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
          text: {
            html: string
          }
        }[]
      }
    }
  }
}

const Work = ({ data }: Props) => {
  const { description, images, title } = data.prismicWork.data

  const gallery = images.map(item => ({
    url: item.image.url,
    alt: item.image.alt,
    text: item.text,
  }))

  const [imageIdx, setImageIdx] = useState(0)
  const lastInLine = imageIdx !== gallery.length - 1

  console.log(description)

  return (
    <>
      <div className='container d-flex'>
        <div className={styles.imageContainer}>
          <img
            onClick={() =>
              lastInLine
                ? setImageIdx((prevIdx: number) => prevIdx + 1)
                : setImageIdx(0)
            }
            src={gallery[imageIdx].url}
            alt={gallery[imageIdx].alt}
          />
        </div>
        <Close />
      </div>
      <Footer>
        <div>
          <p>{title.text}</p>
        </div>
        {gallery[imageIdx].text && (
          <div
            dangerouslySetInnerHTML={{
              __html: gallery[imageIdx].text.html,
            }}
          />
        )}
      </Footer>
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
          text {
            html
          }
        }
      }
    }
  }
`

export default Work
