import React, { useContext } from 'react'
import styles from './Footer.module.scss'
import { Link } from 'gatsby'
import cn from 'classnames'
import { WorkContext } from '~/context/workContext'

const DetailBox = () => {
  const { footerData } = useContext(WorkContext)
  return <div className='parag'>{footerData}</div>
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
