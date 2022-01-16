import React, { useState, useEffect, useContext } from 'react'
import { Work } from '~/types'
import styles from './styles.module.scss'
import { getRandomCords } from '~/utils'
import { WorkContext } from '~/context/workContext'
import { navigate } from 'gatsby'
import cn from 'classnames'

const Item: React.FC<{
  item: Work
  fixed: boolean
  idx: number
  len: number
}> = ({ item, fixed, idx, len }) => {
  const [cords, setCords] = useState<{ x: number; y: number } | null>(null)
  const { alt, url } = item.featured_image
  const [z, setZ] = useState(0)

  useEffect(() => {
    if (window) {
      const limit = window.innerWidth / 1.5
      setCords(getRandomCords({ x: limit, y: 200 }, fixed))
    }
  }, [])

  const { updateFooter, focusedWorkIdx, updateFocusedWorkIdx } = useContext(
    WorkContext
  )

  const isFocused = focusedWorkIdx === idx

  const xAndYpos = (x: number, y: number) => {
    return `translate3d(${x}px, ${y}px, 0px)`
  }

  useEffect(() => {
    if (isFocused) {
      setZ(len)
    } else {
      if (z !== 0) {
        setZ(prevZ => prevZ - 1)
      }
    }
  }, [focusedWorkIdx])

  return (
    cords && (
      <img
        style={{ transform: xAndYpos(cords.x, cords.y), zIndex: z }}
        onClick={
          isFocused
            ? () => navigate(`/work/${item.uid}`)
            : () => {
                updateFocusedWorkIdx(idx)
              }
        }
        className={cn(styles.imgContainer, {
          [styles.focused]: isFocused,
        })}
        onMouseOver={() => updateFooter(<p>{item.title.text}</p>)}
        onMouseLeave={() => updateFooter('')}
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
    <div className={styles.container}>
      {works
        .filter(item => item.featured_image.url)
        .map((item, idx) => (
          <Item
            fixed={idx === works.length - 1}
            key={idx}
            item={item}
            idx={idx}
            len={works.length}
          />
        ))}
    </div>
  )
}

export default Slider
