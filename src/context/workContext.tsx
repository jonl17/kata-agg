import React, { createContext, useState } from 'react'

const WorkContext = createContext<{
  footerData: string
  updateFooter: (data: any) => void
}>({
  footerData: '',
  updateFooter() {},
})

const WorkContextProvider: React.FC = ({ children }) => {
  const [footerData, setFooterData] = useState('')
  const updateFooter = (data: any) => {
    setFooterData(data)
  }
  return (
    <WorkContext.Provider value={{ footerData, updateFooter }}>
      {children}
    </WorkContext.Provider>
  )
}

export { WorkContext, WorkContextProvider }
