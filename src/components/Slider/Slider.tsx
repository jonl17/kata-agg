import React, { useState, useEffect, useContext } from 'react'
import { Work } from '~/types'
import styles from './styles.module.scss'
import { getRandomCords } from '~/utils'
import { WorkContext } from '~/context/workContext'
import { Link } from 'gatsby'

const Item: React.FC<{ item: Work; fixed: boolean }> = ({ item, fixed }) => {
  const [cords, setCords] = useState<{ x: number; y: number } | null>(null)
  const { alt, url } = item.featured_image

  useEffect(() => {
    if (window) {
      const limit = window.innerWidth / 2.5
      setCords(getRandomCords({ x: limit, y: 200 }, fixed))
    }
  }, [])

  const { updateFooter } = useContext(WorkContext)

  return (
    cords && (
      <Link
        style={{ transform: `translate3d(${cords.x}px, ${cords.y}px, 0px)` }}
        to={`/work/${item.uid}`}
        className={styles.img}
      >
        <img
          onMouseOver={() => updateFooter(item.title.text)}
          onMouseLeave={() => updateFooter('')}
          src={url}
          alt={alt}
        />
      </Link>
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
          <Item fixed={idx === works.length - 1} key={idx} item={item} />
        ))}
    </div>
  )
}

export default Slider
