import React from 'react'
import Footer from '~/components/Footer'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main>
      {children}
      <Footer />
    </main>
  )
}

export default Layout
