import React from 'react'

const Footer: React.FC = ({ children }) => {
  return (
    <div className='footer p-2 lg:p-10 z-20 fixed top-0 lg:top-auto lg:bottom-0 w-full flex justify-between align-bottom'>
      {children}
    </div>
  )
}

export default Footer
