import React, { Component } from "react";
import store from "./store";

export default class ReduxPage extends Component {
  componentDidMount() {
    this.unSubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    if (this.unSubscribe) {
      this.unSubscribe();
    }
  }

  add = () => {
    store.dispatch({ type: "ADD" });
  };

  minus = () => {
    store.dispatch({ type: "MINUS" });
  };

  asyncAdd = () => {
    store.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: "ADD" });
      }, 1000);
    });
  };

  add2 = () => {
    store.dispatch({ type: 'ADD2', payload: 100 })
  }

  render() {
    return (
      <div>
        {/* <p>{store.getState()}</p> */}
        <p>{store.getState().count}</p>
        <p>
          <button onClick={this.add}>加</button>&nbsp;
          <button onClick={this.minus}>减</button>&nbsp;
          <button onClick={this.asyncAdd}>异步加</button>
        </p>
        <button onClick={this.add2}>{store.getState().count2.num}</button>
      </div>
    );
  }
}
