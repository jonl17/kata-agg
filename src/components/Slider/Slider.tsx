import React, { useState, useEffect, useRef } from 'react'
import { Work } from '~/types'
import { getRandomCords } from '~/utils'
import { navigate } from 'gatsby'
import cn from 'classnames'
import { ContentType, useFooterStore } from '~/store/footerStore'
import { useSliderStore } from '~/store/sliderStore'
import Img from 'gatsby-image'

const Item: React.FC<{
  item: Work
  fixed: boolean
  idx: number
  len: number
  size: 'small' | 'medium' | 'large'
  toggleFooterStuff: (content: ContentType) => void
}> = ({ item, fixed, idx, len, size, toggleFooterStuff }) => {
  const [cords, setCords] = useState<{ x: number; y: number } | null>(null)
  const [z, setZ] = useState(0)

  useEffect(() => {
    if (window) {
      const limit = window.innerWidth / 1.5
      setCords(getRandomCords({ x: limit, y: 200 }, fixed))
    }
  }, [])

  const { focused, toggleFocused } = useSliderStore()

  const itemRef = useRef<HTMLButtonElement | null>(null)

  const xAndYpos = (x: number, y: number) => {
    if (typeof window !== undefined) {
      const windowWidth = window.innerWidth
      return `translate3d(${x < windowWidth - 800 ? x : 0}px, ${y}px, 0px)`
    }

    return `translate3d(${x}px, ${y}px, 0px)`
  }

  useEffect(() => {
    if (focused === idx) {
      setZ(len)
    } else {
      if (z !== 0) {
        setZ(prevZ => prevZ - 1)
      }
    }
  }, [focused])

  return (
    cords && (
      <button
        ref={itemRef}
        className={cn(
          'sticky top-0 z-0 slider-img slider-img--small h-full w-full',
          {
            'img-border z-20': focused === idx,
            'slider-img--medium': size === 'medium',
            'slider-img--large': size === 'large',
          }
        )}
        style={{ transform: xAndYpos(cords.x, cords.y), zIndex: z }}
        onClick={
          focused === idx
            ? () => navigate(`/work/${item.uid}`)
            : () => {
                toggleFocused(idx)
              }
        }
        onMouseEnter={() => toggleFooterStuff(<p>{item.title.text}</p>)}
        onMouseLeave={() => toggleFooterStuff('')}
      >
        <Img fluid={item.featured_image.fluid} alt={item.featured_image.alt} />
      </button>
    )
  )
}

const Slider: React.FC<{
  works: Work[]
  toggleFooterStuff: (content: ContentType) => void
}> = ({ works, toggleFooterStuff }) => {
  return (
    <div className='grid gap-y-96 grid-rows-1'>
      {works
        .filter(item => item.featured_image.url)
        .map((item, idx) => (
          <Item
            fixed={idx === works.length - 1}
            key={idx}
            item={item}
            idx={idx}
            len={works.length}
            size={item.size}
            toggleFooterStuff={toggleFooterStuff}
          />
        ))}
    </div>
  )
}

export default Slider
