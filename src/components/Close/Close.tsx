import React from 'react'
import { Link } from 'gatsby'

export default ({ ...props }) => (
  <Link to='/' {...props}>
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M2 2L22 22' stroke='black' stroke-width='4' />
      <path d='M22 2L2 22' stroke='black' stroke-width='4' />
    </svg>
  </Link>
)
