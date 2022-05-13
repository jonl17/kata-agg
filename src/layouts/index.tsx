import React from 'react'
import { Helmet } from 'react-helmet'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>Katrín Agnes</title>
        <link rel='icon' href='/favicon.png' />
      </Helmet>
      <main>{children}</main>
    </>
  )
}

export default Layout
