import React, { useEffect } from 'react'

const Content: React.FC<{ html: string; className?: string }> = ({
  html,
  className = '',
}) => {
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  )
}

export default Content
