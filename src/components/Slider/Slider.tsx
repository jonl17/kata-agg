import React from 'react'
import { Work } from '~/types'

const Slider: React.FC<{
  works: Work[]
}> = ({ works }) => {
  return <div>{works[0].uid}</div>
}

export default Slider
