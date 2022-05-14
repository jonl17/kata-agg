import React, { useEffect, useState } from 'react'
import { graphql } from 'gatsby'
import Footer from '~/components/Footer'
import Close from '~/components/Close'
import cn from 'classnames'
import Img, { FluidObject } from 'gatsby-image'

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
          image: { url: string; alt: string; fluid: FluidObject }
          text: {
            html: string
          }
          name?: string
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
    title: item.name,
  }))

  const [imageIdx, setImageIdx] = useState(0)
  const lastInLine = imageIdx !== gallery.length - 1

  const [active, setActive] = useState(false)

  const [cords, setCords] = useState<{ x: number; y: number }>()

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse)
  }, [])

  const handleMouse = (e: MouseEvent) => {
    const { clientX, clientY } = e
    setCords({ x: clientX - 30, y: clientY - 30 })
  }

  return (
    <>
      <div className='h-screen w-full grid place-items-center p-10 relative overflow-hidden'>
        <span
          style={{
            transform: `translate3d(${cords?.x}px, ${cords?.y}px, 0)`,
          }}
          className={cn(
            'top-0 left-0 absolute w-10 h-10 z-10 pointer-events-none',
            {
              visible: active,
              invisible: !active,
            }
          )}
        >
          <p>{`${imageIdx + 1}/${images.length}`}</p>
        </span>
        {gallery.map((item, key) => (
          <img
            key={key}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            className={cn(
              'slider-img absolute z-0 opacity-0 pointer-events-none',
              {
                'cursor-none': active,
                'opacity-100 pointer-events-auto': imageIdx === key,
              }
            )}
            onClick={() =>
              lastInLine
                ? setImageIdx((prevIdx: number) => prevIdx + 1)
                : setImageIdx(0)
            }
            src={item.url}
            alt={item.alt}
          />
        ))}
      </div>
      <Close />

      <Footer>
        <div>
          <p>{gallery[imageIdx].title ?? title.text}</p>
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
            fluid {
              ...GatsbyPrismicImageFluid
            }
          }
          name
          text {
            html
          }
        }
      }
    }
  }
`

export default Work
