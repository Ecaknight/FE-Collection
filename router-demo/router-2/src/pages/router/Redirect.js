import React, { Component } from "react";
import RouterContext from "./RouterContext";

export default class Redirect extends Component {
  render() {
    return (
      <RouterContext.Provider>
        {(context) => {
          const { history } = context;
          const { to, push = false } = this.props;

          return (
            <LifeCycle
              onMount={() => {
                push ? history.push(to) : history.replace(to);
              }}
            />
          );
        }}
      </RouterContext.Provider>
    );
  }
}

export class LifeCycle extends Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount.call(this, this);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.onUpdate) {
      this.props.onUpdate.call(this, this, prevProps);
    }
  }

  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount.call(this, this);
    }
  }

  render() {
    return null;
  }
}
