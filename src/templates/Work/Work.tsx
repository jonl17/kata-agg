import React, { useMemo, useState } from 'react'
import { graphql } from 'gatsby'
import Footer from '~/components/Footer'
import Close from '~/components/Close'
import cn from 'classnames'

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

  const [active, setActive] = useState(false)

  const [cords, setCords] = useState<{ x: number; y: number }>()

  const handleMouse = (e: MouseEvent) => {
    if (active) {
      const { clientX, clientY } = e
      setCords({ x: clientX, y: clientY })
    }
  }

  return (
    <>
      <div className='h-screen w-full grid place-items-center p-10'>
        <img
          onMouseEnter={() => setActive(true)}
          onMouseMove={e => handleMouse(e)}
          onMouseLeave={() => setActive(false)}
          className={cn('slider-img', {
            'slider-img--active': active,
          })}
          onClick={() =>
            lastInLine
              ? setImageIdx((prevIdx: number) => prevIdx + 1)
              : setImageIdx(0)
          }
          src={gallery[imageIdx].url}
          alt={gallery[imageIdx].alt}
        />
        {active && (
          <p
            style={{
              transform: `translate3d(${cords?.x}px, ${cords?.y}px, 0)`,
            }}
            className='absolute'
          >
            {`${imageIdx + 1}/${images.length}`}
          </p>
        )}
      </div>
      <Close />

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
