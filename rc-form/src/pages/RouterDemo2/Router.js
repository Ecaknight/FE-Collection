import React, { Component } from 'react'
import RouterContext from './RouterContext'

export default class Router extends Component {
  static computeRootMatch(pathname) {
    return { path: '/', url: '/', params: {}, isExact: pathname === '/' }
  }

  constructor(props) {
    super(props)
    this.state = {
      location: props.history.location
    }
    
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen(location => {
      const newLocation = location.location
      this.setState({
        location: newLocation
      })
    })
  }

  componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten()
    }
  }

  render() {
    const { history, children } = this.props
    const { location } = this.state
    return (
      <RouterContext.Provider value={{
        history,
        location,
        match: Router.computeRootMatch(location.pathname),
      }}>
        {children}
      </RouterContext.Provider>
    )
  }
}
