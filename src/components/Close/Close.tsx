import React, { useContext } from 'react'
import { Link } from 'gatsby'
import cn from 'classnames'
import { useFooterStore } from '~/store/footerStore'

export default ({ ...props }) => {
  const { toggleContent } = useFooterStore()
  return (
    <Link
      className='absolute h-20 w-20 grid place-items-center right-0 top-0'
      to='/'
      {...props}
      onClick={() => toggleContent('')}
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
