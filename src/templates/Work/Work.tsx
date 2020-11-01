import React, { useContext, useEffect } from 'react'
import { graphql } from 'gatsby'
import Footer from '~/components/Footer'
import { WorkContext } from '~/context/workContext'
import Close from '~/components/Close'
import styles from './Work.module.scss'

const Work: React.FC<{
  data: {
    prismicWork: {
      data: {
        title: {
          html: string
        }
        content: {
          html: string
        }
      }
    }
  }
}> = ({ data }) => {
  const { updateFooter } = useContext(WorkContext)

  const { content, title } = data.prismicWork.data

  useEffect(() => {
    updateFooter(
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content.html }}
      />
    )
  }, [])

  return (
    <div className='mt-4 position-relative container'>
      <Close />
      <Footer />
    </div>
  )
}

export const query = graphql`
  query($id: String!) {
    prismicWork(id: { eq: $id }) {
      data {
        title {
          html
        }
        content {
          html
        }
      }
    }
  }
`

export default Work
