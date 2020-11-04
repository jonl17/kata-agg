import React, { useState, useEffect, useContext } from 'react'
import { Work } from '~/types'
import styles from './styles.module.scss'
import { getRandomCords } from '~/utils'
import { WorkContext } from '~/context/workContext'
import { navigate } from 'gatsby'
import cn from 'classnames'

const Item: React.FC<{ item: Work; fixed: boolean; idx: number }> = ({
  item,
  fixed,
  idx,
}) => {
  const [cords, setCords] = useState<{ x: number; y: number } | null>(null)
  const { alt, url } = item.featured_image

  useEffect(() => {
    if (window) {
      const limit = window.innerWidth / 2.5
      setCords(getRandomCords({ x: limit, y: 200 }, fixed))
    }
  }, [])

  const { updateFooter, focusedWorkIdx, updateFocusedWorkIdx } = useContext(
    WorkContext
  )

  const isFocused = focusedWorkIdx === idx
  return (
    cords && (
      <img
        style={{ transform: `translate3d(${cords.x}px, ${cords.y}px, 0px)` }}
        onClick={
          isFocused
            ? () => navigate(`/work/${item.uid}`)
            : () => updateFocusedWorkIdx(idx)
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
          />
        ))}
    </div>
  )
}

export default Slider
