import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class RouterPage extends Component {
  render() {
    return (
      <Router>
        <Link to="/">首页</Link>&nbsp;
        <Link to="/login">登录</Link>&nbsp;
        <Link to="/user">用户中心</Link>&nbsp;
        <Link to="/product/123">产品详情</Link>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/user" component={UserPage} />
        <Route path="/product/:id" component={ProductPage} />
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

class LoginPage extends Component {
  render() {
    return <div>LoginPage</div>;
  }
}

class ProductPage extends Component {
  render() {
    console.log(this.props);
    return <div>ProductPage {this.props.match.params.id}</div>;
  }
}
