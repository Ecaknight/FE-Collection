// 路由守卫，常用于判断该路由页面是否有权限或是否已登录
import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ isLogin, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              form: { redirect: props.location.pathname },
            }}
          />
        )
      }
    />
  );
}

const mapStateToProps = ({ user }) => {
  return { isLogin: user.isLogin };
};

export default connect(mapStateToProps)(PrivateRoute);
