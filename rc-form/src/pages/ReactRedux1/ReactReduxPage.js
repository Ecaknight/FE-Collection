import React, { Component } from "react";
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { bindActionCreators, connect } from './mreactredux'

class ReactReduxPage extends Component {
  render() {
    console.log(this.props);
    const { num, add, minus } = this.props;
    return (
      <div>
        <p>{num}</p>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return state;
  },
  (dispatch) => {
    let creator = {
      add: () => ({ type: "ADD" }),
      minus: () => ({ type: "MINUS" }),
    };
    creator = bindActionCreators(creator, dispatch);
    return {
      dispatch,
      ...creator,
    };
  }
  // {
  //   add: () => ({ type: 'ADD' }),
  //   minus: () => ({ type: 'MINUS' }),
  // }
)(ReactReduxPage);
