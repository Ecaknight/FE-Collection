import React from 'react'
import RouterContext from './RouterContext'

export default function Link({ to, children, ...restProps }) {
  const ctx = React.useContext(RouterContext)

  const onClick = React.useCallback((e) => {
    e.preventDefault();
    ctx.history.push(to)    
  }, [])

  return <a href={to} {...restProps} onClick={onClick}>{children}</a>
}
