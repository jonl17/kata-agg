import React from 'react'
import { graphql, Link } from 'gatsby'
import '~/prismic/fragments/work'
import Slider from '~/components/Slider'
import { PrismicFrontpageQuery } from '~/types'
import Footer from '~/components/Footer'
import { useFooterStore } from '~/store/footerStore'

const Frontpage: React.FC<{
  data: any
}> = ({ data }) => {
  const { works } = data.prismicFrontpage.data

  const { content } = useFooterStore()

  return (
    <div>
      {!!works.length && (
        <Slider
          works={works
            .filter((item: any) => item.work.document)
            .map((item: any) => {
              return {
                uid: item.work.document.uid,
                ...item.work.document.data,
                size: item.size,
              }
            })}
        />
      )}
      <Footer>
        <Link to='/info'>
          <p>info</p>
        </Link>
        <div>{content}</div>
      </Footer>
    </div>
  )
}

export default Frontpage

export const query = graphql`
  {
    prismicFrontpage {
      data {
        works {
          size
          work {
            document {
              ...prismicWorkFragment
            }
          }
        }
      }
    }
  }
`
