import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class index extends Component {
  add = () => {
    this.props.dispatch({ type: "ADD" });
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <p>{this.props.count}</p>
        <button onClick={this.add}>加</button>
        <button onClick={this.props.minus}>减</button>
      </div>
    );
  }
}

export default connect(
  (state) => ({ count: state }),
  (dispatch) => {
    let creators = {
      add: () => ({ type: "ADD" }),
      minus: () => ({ type: "MINUS" }),
    };
    creators = bindActionCreators(creators, dispatch);
    return { dispatch, ...creators };
  }
)(index);
