import React from 'react'
import styles from './Footer.module.scss'
import { Link } from 'gatsby'
import cn from 'classnames'

const DetailBox = () => {
  return (
    <div>
      <p className='parag'>the WOK</p>
      <p className='parag'>1992</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div
      className={cn(
        styles.container,
        'd-flex justify-content-between align-items-end'
      )}
    >
      <DetailBox />
      <Link to='/information'>
        <p className='parag'>Information</p>
      </Link>
    </div>
  )
}

export default Footer
