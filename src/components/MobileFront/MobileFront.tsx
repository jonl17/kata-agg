import React, { useState } from 'react'
import { Work } from '~/types'
import Img from 'gatsby-image'
import { useInView } from '~/hook/useInView'
import { Link } from 'gatsby'

const WorkItem = ({
  featured_image,
  updateWorkInView,
  index,
  uid,
}: Work & { updateWorkInView: (index: number) => void; index: number }) => {
  const ref = useInView(
    () => {
      console.log('set this index: ', index)
      updateWorkInView(index)
    },
    () => console.log('outta view')
  )

  return (
    <Link to={`/work/${uid}`} className='h-screen'>
      <div ref={ref}>
        <Img
          imgStyle={{ objectFit: 'contain' }}
          fluid={featured_image.fluid}
          alt={featured_image.alt}
        />
      </div>
    </Link>
  )
}

type Props = {
  works: Array<Work>
}

export default function MobileFront({ works = [] }: Props) {
  const [workInViewIndex, setWorkInViewIndex] = useState(0)

  const workInView = works[workInViewIndex]

  const updateWorkInView = (index: number) => setWorkInViewIndex(index)
  return (
    <section>
      <div className='p-2 grid mt-12 gap-96'>
        {works.map((work, key) => (
          <WorkItem
            key={key}
            {...work}
            updateWorkInView={updateWorkInView}
            index={key}
          />
        ))}
      </div>
      <p className='fixed bottom-2 left-2'>{workInView.title.text}</p>
    </section>
  )
}
