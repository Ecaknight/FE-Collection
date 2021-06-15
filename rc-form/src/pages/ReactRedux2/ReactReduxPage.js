import React, { Component } from "react";
// import { connect } from "react-redux";
import { connect } from "./mreactredux";

class ReactReduxPage extends Component {
  render() {
    console.log(this.props);
    const { count, add, minus } = this.props;
    return (
      <div>
        <p>React Redux Page</p>
        <p>{count}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add: () => {
      dispatch({ type: "ADD" });
    },
    minus: () => dispatch({ type: "MINUS" }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxPage);
