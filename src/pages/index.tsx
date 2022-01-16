import React from 'react'
import { graphql, Link } from 'gatsby'
import '~/prismic/fragments/work'
import Slider from '~/components/Slider'
import { PrismicFrontpageQuery } from '~/types'
import Footer from '~/components/Footer'

const Frontpage: React.FC<{
  data: { prismicFrontpage: PrismicFrontpageQuery }
}> = ({ data: { prismicFrontpage } }) => {
  if (!prismicFrontpage.data) {
    return null
  }

  const { works } = prismicFrontpage.data

  console.log(works)

  return (
    <div>
      {!!works.length && (
        <Slider
          works={works
            .filter(item => item.work.document)
            .map(item => {
              return {
                uid: item.work.document.uid,
                ...item.work.document.data,
              }
            })}
        />
      )}
      <Footer>
        <Link to='/info'>
          <p>info</p>
        </Link>
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
