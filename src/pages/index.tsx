import React, { useMemo, useState } from 'react'
import { graphql, Link } from 'gatsby'
import '~/prismic/fragments/work'
import Slider from '~/components/Slider'
import Footer from '~/components/Footer'
import { ContentType, useFooterStore } from '~/store/footerStore'
import { sortWorks } from '~/utils'
import { Work } from '~/types'
import MobileFront from '~/components/MobileFront'

const workResolver = (node: any): Work => ({
  uid: node.work.document.uid,
  url: node.work.document.url,
  size: node.size,
  content: node.work.document.data.description,
  featured_image: node.work.document.data.featured_image,
  title: node.work.document.data.title,
  topofthepops: node.work.document.data.topofthepops,
  year: 0,
  images: node.work.document.data.images,
})

const Frontpage: React.FC<{
  data: any
}> = ({ data }) => {
  const { works } = data.prismicFrontpage.data

  const shuffledWorks = useMemo(() => sortWorks(works.map(workResolver)), [
    works,
  ])

  const [footerStuff, setFooterStuff] = useState<ContentType>()
  const toggleFooterStuff = (stuff: ContentType) => setFooterStuff(stuff)

  return (
    <div>
      <div className='block lg:hidden'>
        <MobileFront works={shuffledWorks} />
      </div>
      <div className='hidden lg:block'>
        <Slider works={shuffledWorks} toggleFooterStuff={toggleFooterStuff} />
      </div>
      <Footer>
        {!footerStuff ? (
          <Link to='/info'>
            <p>info</p>
          </Link>
        ) : (
          <div>{footerStuff}</div>
        )}
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
