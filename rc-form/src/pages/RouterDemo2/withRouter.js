import React from 'react'
import RouterContext from './RouterContext'

export default function withRouter(WrappedComp) {
  return props => {
    <RouterContext.Consumer>
      {
        context => {
          return <WrappedComp {...props} {...context} />
        }
      }
    </RouterContext.Consumer>
  }
}
