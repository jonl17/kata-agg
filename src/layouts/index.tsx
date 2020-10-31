import React from 'react'
import Footer from '~/components/Footer'
import { WorkContextProvider } from '~/context/workContext'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main>
      <WorkContextProvider>
        {children}
        <Footer />
      </WorkContextProvider>
    </main>
  )
}

export default Layout
