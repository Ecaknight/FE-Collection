import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class LoginPage extends Component {
  state = {
    name: "",
  };
  onName = (e) => {
    this.setState({ name: e.target.value });
  };

  onLogin = () => {
    this.props.login({ name: this.state.name });
  };

  render() {
    const { loading, isLogin, location, err } = this.props;
    const { name } = this.state;
    if (isLogin) {
      const { from = "/" } = location.state || {};
      return <Redirect to={from} />;
    }
    return (
      <div>
        <h2>LoginPage</h2>
        <input value={name} onChange={this.onName} />
        <button onClick={this.onLogin}>
          {loading ? "loading......" : "login"}
        </button>
        <p className="red">{err.msg}</p>
      </div>
    );
  }
}

export default connect(
  ({ user }) => ({
    isLogin: user.isLogin,
    loading: user.loading,
    err: user.err,
  }),
  {
    login: (userInfo) => ({ type: "LOGIN_SAGA", payload: userInfo }),
  }
)(LoginPage);
