import React, { Component } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

export default class RouterPage extends Component {
  render() {
    return (
      <div>
        <p>Router Page</p>
        <Router>
          <nav>
            <Link to="/">首页</Link>
            <Link to="/user">用户中心</Link>
            <Link to="/login">登陆</Link>
            <Link to="/product/122">详情数据</Link>
          </nav>
          <Switch>
            <Route
              exact
              path="/" 
              // children={() => <div>children</div>} 
              // render={render}
              component={HomePage}
            />
            <Route path="/user" component={UserPage}/>
            <Route path="/login" component={Login} />
            <Route path="/product/:id" component={Product} />
            <Route component={_404Page} />
          </Switch>
        </Router>
      </div>
    )
  }
}

function render (props) {
  console.log(props)
  return <div>render</div>
}

function HomePage () {
  return <div>Home Page</div>
}

function UserPage () {
  return <div>UserPage</div>
}

class Login extends Component {
  render () {
    return <div>Login page</div>
  }
}

function _404Page () {
  return <div>404 Page</div>
}

function Product (props) {
  return <div>详情数据: {props.match.params.id}</div>
}