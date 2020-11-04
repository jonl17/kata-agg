import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { WorkContext } from '~/context/workContext'
import styles from './Close.module.scss'
import cn from 'classnames'

export default ({ ...props }) => {
  const { updateFooter } = useContext(WorkContext)
  return (
    <Link
      className={cn(styles.closeBtn)}
      to='/'
      {...props}
      onClick={() => updateFooter('')}
    >
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M2 2L22 22' stroke='black' strokeWidth='4' />
        <path d='M22 2L2 22' stroke='black' strokeWidth='4' />
      </svg>
    </Link>
  )
}
