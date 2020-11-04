import React, { useContext, useEffect } from 'react'
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

const Work = ({ data }: Props) => {
  const { description, images } = data.prismicWork.data
  return (
    <>
      <div className='container d-flex'>
        <div className={styles.imageContainer}>
          <img src={images[0].image.url} />
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
