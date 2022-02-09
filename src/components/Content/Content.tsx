import React from 'react'
import cn from 'classnames'

const Content: React.FC<{ html: string; className?: string }> = ({
  html,
  className = '',
}) => {
  return (
    <div
      className={cn(className, 'content')}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default Content
