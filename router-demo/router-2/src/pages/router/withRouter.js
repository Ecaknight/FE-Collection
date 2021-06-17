import React from 'react'
import RouterContext from './RouterContext'

function withRouter (WrappedComp) {
  return props => {
    return <RouterContext.Consumer>
      {
        context => {
          return <WrappedComp {...props} {...context} />
        }
      }
    </RouterContext.Consumer>
  }
}

export default withRouter
