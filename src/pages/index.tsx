import React from 'react'
import { graphql } from 'gatsby'
import '~/prismic/fragments/work'
import Slider from '~/components/Slider'
import { PrismicFrontpageQuery } from '~/types'

const Frontpage: React.FC<{
  data: { prismicFrontpage: PrismicFrontpageQuery }
}> = ({ data: { prismicFrontpage } }) => {
  if (!prismicFrontpage.data) {
    return null
  }

  const { works } = prismicFrontpage.data

  return (
    <div>
      {!!works.length && (
        <Slider
          works={works.map(item => {
            return {
              uid: item.work.document.uid,
              ...item.work.document.data,
            }
          })}
        />
      )}
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
