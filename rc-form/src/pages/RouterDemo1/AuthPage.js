import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from 'react-router-dom'

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;


class AuthPage extends Component {
  render() {
    return (
      <Router>
        <ul>
          <AuthButton />
          <li>
            <Link to="/public">公共页面</Link>
          </li>
          <li>
            <Link to="/private">私有页面</Link>
          </li>
          <Switch>
            <Route path="/public" component={Public} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/private" component={Protected} />
          </Switch>
        </ul>
      </Router>
    )
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          退出
        </button>
      </p>
    ) : (
      <p>还没登陆.</p>
    )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


class Login extends Component {
  state = {
    redic: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redic: true })
    })
  }

  render () {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redic } = this.state;

    if (redic) {
      return <Redirect to={from} />
    }

    return <div>
      <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
    </div>
  }
}

export default AuthPage