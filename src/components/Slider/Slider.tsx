import React, { useState, useEffect } from 'react'
import { Work } from '~/types'
import { getRandomCords } from '~/utils'
import { navigate } from 'gatsby'
import cn from 'classnames'
import { useFooterStore } from '~/store/footerStore'
import { useSliderStore } from '~/store/sliderStore'

const Item: React.FC<{
  item: Work
  fixed: boolean
  idx: number
  len: number
  size: 'small' | 'medium' | 'large'
}> = ({ item, fixed, idx, len, size }) => {
  const [cords, setCords] = useState<{ x: number; y: number } | null>(null)
  const { alt, url } = item.featured_image
  const [z, setZ] = useState(0)

  useEffect(() => {
    if (window) {
      const limit = window.innerWidth / 1.5
      setCords(getRandomCords({ x: limit, y: 200 }, fixed))
    }
  }, [])

  const { toggleContent } = useFooterStore()
  const { focused, toggleFocused } = useSliderStore()

  const xAndYpos = (x: number, y: number) => {
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
      <img
        className={cn('sticky top-0 z-0 slider-img slider-img--small', {
          'img-border z-20': focused === idx,
          'slider-img--medium': size === 'medium',
          'slider-img--large': size === 'large',
        })}
        style={{ transform: xAndYpos(cords.x, cords.y), zIndex: z }}
        onClick={
          focused === idx
            ? () => navigate(`/work/${item.uid}`)
            : () => {
                toggleFocused(idx)
              }
        }
        onMouseOver={() => toggleContent(<p>{item.title.text}</p>)}
        onMouseLeave={() => toggleContent('')}
        src={url}
        alt={alt}
      />
    )
  )
}

const Slider: React.FC<{
  works: Work[]
}> = ({ works }) => {
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
          />
        ))}
    </div>
  )
}

export default Slider
