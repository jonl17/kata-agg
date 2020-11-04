import React, { createContext, useState } from 'react'

const WorkContext = createContext<{
  footerData: string
  updateFooter: (data: any) => void
  focusedWorkIdx: number
  updateFocusedWorkIdx: (idx: number) => void
}>({
  footerData: '',
  updateFooter() {},
  focusedWorkIdx: -1,
  updateFocusedWorkIdx() {},
})

const WorkContextProvider: React.FC = ({ children }) => {
  const [footerData, setFooterData] = useState('')
  const [focusedWorkIdx, setFocusedWorkIdx] = useState(-1)
  const updateFooter = (data: any) => {
    setFooterData(data)
  }
  const updateFocusedWorkIdx = (idx: number) => setFocusedWorkIdx(idx)
  return (
    <WorkContext.Provider
      value={{ footerData, updateFooter, focusedWorkIdx, updateFocusedWorkIdx }}
    >
      {children}
    </WorkContext.Provider>
  )
}

export { WorkContext, WorkContextProvider }
