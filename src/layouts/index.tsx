import React from 'react'
import Footer from '~/components/Footer'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <main>{children}</main>
}

export default Layout
