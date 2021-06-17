import React, { Component } from 'react'
import RouterContext from './RouterContext'
import matchPath from './matchPath'

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {
          context => {
            let element = null
            let match = null
            const { location } = context
            // 精准匹配最近一个
            React.Children.forEach(this.props.children, child => {
              if (match === null && React.isValidElement(child)) {
                element = child
                // 
                match = child.props.path ? matchPath(location.pathname, child.props) : context.match
              }
            })
            return React.cloneElement(element, { computeMatch: match })
          }
        }
      </RouterContext.Consumer>
    )
  }
}
