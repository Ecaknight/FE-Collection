import React, { Component } from "react";
import PrivateRoute from "./PrivateRoute";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Prompt,
} from "react-router-dom";
import LoginPage from "./LoginPage";
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Switch,
//   //   withRouter,
//   Prompt,
// } from "./router";

export default class RouterPage extends Component {
  render() {
    return (
      <Router>
        <Link to="/">首页</Link>&nbsp;
        <Link to="/login">登录</Link>&nbsp;
        <Link to="/user">用户中心</Link>&nbsp;
        <Link to="/product/123">产品详情</Link>&nbsp;
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/product/:id" component={ProductPage} />
          <Route render={_404Page} />
        </Switch>
      </Router>
    );
  }
}

function HomePage() {
  return <div>HomePage</div>;
}

function UserPage() {
  return <div>UserPage</div>;
}

class ProductPage extends Component {
  state = {
    confirm: true,
  };
  render() {
    return (
      <div>
        ProductPage {this.props.match.params.id}
        <Prompt when={this.state.confirm} message="你确定离开吗？" />
      </div>
    );
  }
}

function _404Page() {
  return <div>_404Page</div>;
}
