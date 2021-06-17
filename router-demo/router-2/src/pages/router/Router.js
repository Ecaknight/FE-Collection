import React, { Component } from 'react'
import RouterContext from './RouterContext'

export default class Router extends Component {
  // 初始化一个match
  static computeRootMatch(pathname) {
    return { path: '/', url: '/', params: {}, isExact: pathname === '/' }
  }

  constructor(props) {
    super(props)
    // 自己维护一个状态
    this.state = {
      location: props.history.location
    }
  }

  componentDidMount () {
    this.unlisten = this.props.history.listen((location) => {
      this.setState({ location })
    })
  }

  componentWillUnmount () {
    this.unlisten()
  }

  render() {
    return (
      <RouterContext.Provider value={{
        history: this.props.history,
        location: this.state.location,
        match: Router.computeRootMatch(this.state.location.pathname),
      }}>
        {this.props.children}
      </RouterContext.Provider>
    )
  }
}
