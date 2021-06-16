import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link, Switch } from './index'
import ProductPage from './ProductPage'


export default class RouterPage extends Component {
  render() {
    return (
      <div>
        <p>Router Page</p>
        <Router>
          <Link to="/">首页</Link>
          <Link to="/user">用户中心</Link>
          <Link to="/login">登录</Link>
          <Link to="/product/123">产品详情</Link>

          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/user" component={UserPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route component={_404Page} />
          </Switch>
        </Router>
      </div>
    )
  }
}

function HomePage () {
  return <div>HomePage</div>
}

function UserPage () {
  return <div>UserPage</div>
}

class LoginPage extends Component {
  render() {
    return (
      <div>
        LoginPage
      </div>
    )
  }
}

function _404Page() {
  return <div>404 page</div>
}