import React, { useContext } from 'react'
import styles from './Footer.module.scss'
import { Link } from 'gatsby'
import cn from 'classnames'
import { WorkContext } from '~/context/workContext'

type FooterProps = { workDetails?: string | React.ReactNode }

const Footer = ({ workDetails = '' }: FooterProps) => {
  const { footerData } = useContext(WorkContext)

  return (
    <div
      className={cn(
        styles.footerContainer,
        'd-flex justify-content-between align-items-end container'
      )}
    >
      <div className='parag'>{workDetails}</div>
      <Link to='/information'>{footerData ? footerData : 'Information'}</Link>
    </div>
  )
}

export default Footer
